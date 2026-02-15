# Contributing to PQMongo: Crypto-Agility Standards

Welcome! This project is built with **Crypto-Agility** as a core principle. This means the system must be able to swap cryptographic algorithms (e.g., moving from ML-KEM-1024 to future NIST standards) without a total rewrite.

## Coding Standards for Security

### 1. Algorithm Decoupling
Avoid hardcoding algorithm names in business logic. Use the utility functions in `src/lib/pqc.ts`. If a new algorithm is introduced, update the library, not the components.

### 2. Standardized Metadata
All encrypted records must follow the `EncryptedPayload` interface:
```typescript
interface EncryptedPayload {
    ciphertext: string;
    encapsulation: string;
    iv: string;
    authTag: string;
    latencyMs: number;
}
```

### 3. Constant-Time Operations
When implementing new cryptographic primitives, ensure they are side-channel resistant. Use libraries like `mlkem` that specifically address timing attacks.

### 4. Zero Simulation Policy
All cryptographic operations in the `main` branch must be real. Use `node:crypto` or compliant WASM/JS libraries only. Performance metrics must be measured from real execution, not simulated delays.

## Pull Request Process
1. Ensure all changes pass the `npm run build` check.
2. Verify that any algorithm changes include updated Prometheus metrics.
3. Update the `Quantum-Resilience Report` logic if the metadata schema changes.

## Security Disclosures
If you find a vulnerability, please do NOT open a public issue. Use the private security advisory feature or contact the maintainers directly.
