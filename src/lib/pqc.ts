export type PQCMetrics = {
    handshake_latency_ms: number
    packet_size_bytes: number
    throughput_kbps: number
    quantum_confidence_score: number
    encryption_status: "ML-KEM-1024" | "AES-256-GCM"
}

export function getSimulatedPQCMetrics(): PQCMetrics {
    // Simulate ML-KEM-1024 characteristics
    // ML-KEM-1024 (Kyber-1024) has ~1568 bytes public key, ~1568 bytes ciphertext.
    // Latency is higher than ECDH but very fast (~0.1-0.2ms CPU, but network overhead adds up).
    // We simulate a realistic "over the wirte" handshake latency including RTT.

    const baseLatency = 15; // ms
    const jitter = Math.random() * 5;

    return {
        handshake_latency_ms: parseFloat((baseLatency + jitter).toFixed(2)),
        packet_size_bytes: 3136 + Math.floor(Math.random() * 100), // ~3KB overhead
        throughput_kbps: 1250 + Math.floor(Math.random() * 500),
        quantum_confidence_score: 98.5, // High confidence
        encryption_status: "ML-KEM-1024"
    }
}
