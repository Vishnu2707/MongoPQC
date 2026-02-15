export type PaymentDocument = {
    id: string
    transactionId: string
    amount: number
    currency: string
    status: "pending" | "processing" | "success" | "failed"
    encryptionMethod: "AES-256-GCM" | "ML-KEM-1024 + AES-256"
    quantumSafe: boolean
    timestamp: string
    // Real PQC Metadata
    ciphertext?: string
    encapsulation?: string
    iv?: string
    authTag?: string
    latencyMs?: number
}

export const mockData: PaymentDocument[] = Array.from({ length: 50 }, (_, i) => ({
    id: `doc_${i + 1}`,
    transactionId: `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    amount: Math.floor(Math.random() * 10000) + 100,
    currency: "USD",
    status: i % 5 === 0 ? "failed" : i % 3 === 0 ? "processing" : "success",
    encryptionMethod: i % 2 === 0 ? "ML-KEM-1024 + AES-256" : "AES-256-GCM",
    quantumSafe: i % 2 === 0,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString(),
}))
