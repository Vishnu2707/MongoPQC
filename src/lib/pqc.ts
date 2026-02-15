import { MlKem1024 } from 'mlkem';
import * as crypto from 'crypto';
import { pqcLatencyGauge, pqcKeysCounter } from '@/lib/metrics';

/**
 * Hybrid Encryption Engine (Quantum-Safe + Classical)
 * Standards: NIST FIPS 203 (ML-KEM) + AES-256-GCM (FIPS 197)
 */

export interface EncryptedPayload {
    ciphertext: string; // Base64 AES ciphertext
    encapsulation: string; // Base64 ML-KEM encapsulation (ciphertext of the AES key)
    iv: string; // Base64 Initialization Vector
    authTag: string; // Base64 GCM Auth Tag
    latencyMs: number; // Real measured latency
}

/**
 * Encrypts a document using Hybrid ML-KEM-1024 + AES-256-GCM
 */
export async function encryptHybrid(data: string, publicKeyBytes: Uint8Array): Promise<EncryptedPayload> {
    const start = performance.now();

    // 1. ML-KEM Encapsulation (Generates Shared Secret + Ciphertext)
    const sender = new MlKem1024();
    const [encapsulation, sharedSecret] = await sender.encap(publicKeyBytes);

    // 2. AES-256-GCM Encryption
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', sharedSecret, iv);

    let ciphertext = cipher.update(data, 'utf8', 'base64');
    ciphertext += cipher.final('base64');
    const authTag = cipher.getAuthTag().toString('base64');

    const end = performance.now();
    const latency = end - start;

    // Update Prometheus metrics
    if (pqcLatencyGauge) pqcLatencyGauge.set(latency / 1000); // Scale to seconds

    return {
        ciphertext,
        encapsulation: Buffer.from(encapsulation).toString('base64'),
        iv: iv.toString('base64'),
        authTag,
        latencyMs: latency
    };
}

/**
 * Decrypts a document using Hybrid ML-KEM-1024 + AES-256-GCM
 */
export async function decryptHybrid(
    payload: EncryptedPayload,
    privateKeyBytes: Uint8Array
): Promise<string> {
    // 1. ML-KEM Decapsulation (Recover the AES Shared Secret)
    const encapsulationBuffer = Buffer.from(payload.encapsulation, 'base64');
    const recipient = new MlKem1024();
    const sharedSecret = await recipient.decap(encapsulationBuffer, privateKeyBytes);

    // 2. AES-256-GCM Decryption
    const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        sharedSecret,
        Buffer.from(payload.iv, 'base64')
    );

    decipher.setAuthTag(Buffer.from(payload.authTag, 'base64'));

    let decrypted = decipher.update(payload.ciphertext, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

/**
 * Generates an ML-KEM-1024 keypair
 */
export async function generatePQCKeypair() {
    const recipient = new MlKem1024();
    const [publicKey, privateKey] = await recipient.generateKeyPair();

    if (pqcKeysCounter) pqcKeysCounter.inc();

    return { publicKey, privateKey };
}
