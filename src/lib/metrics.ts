import { register, Gauge, Counter } from 'prom-client';

// Simple check to prevent multiple registration in dev
const globalRef = global as any;

if (!globalRef._prom_registered) {
    globalRef._pqc_latency = new Gauge({
        name: 'pqc_handshake_duration_seconds',
        help: 'Latency of ML-KEM-1024 encapsulation in seconds',
    });

    globalRef._pqc_keys_total = new Counter({
        name: 'pqc_keys_generated_total',
        help: 'Total number of ML-KEM-1024 keypairs generated',
    });

    globalRef._prom_registered = true;
}

export const pqcLatencyGauge = globalRef._pqc_latency;
export const pqcKeysCounter = globalRef._pqc_keys_total;
export { register };
