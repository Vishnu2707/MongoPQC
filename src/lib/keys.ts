import { generatePQCKeypair } from "./pqc";

// In a real prod environment, these would be in a Hardware Security Module (HSM) 
// or vault. For this demo, we generate them once and they persist until server restart.
// We export the keys as a promise so consumers can await them.
export const SERVER_KEYS = generatePQCKeypair();

/**
 * Convenience helper to get keys directly
 */
export async function getServerKeys() {
    return await SERVER_KEYS;
}
