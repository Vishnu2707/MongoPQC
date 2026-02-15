"use server"

import dbConnect from "@/lib/db"
import Transaction, { ITransaction } from "@/models/Transaction"
import { PaymentDocument } from "@/components/data-grid/schema"

import mongoose from "mongoose"

export async function getCollections() {
    await dbConnect()
    if (!mongoose.connection.db) return []

    try {
        const collections = await mongoose.connection.db.listCollections().toArray()
        // Get stats for each
        const detailedCollections = await Promise.all(collections.map(async (col) => {
            if (!mongoose.connection.db) return { name: col.name, count: 0, size: 0, avgObjSize: 0, storageSize: 0 }
            const stats = await mongoose.connection.db.command({ collStats: col.name })
            return {
                name: col.name,
                count: stats.count,
                size: stats.size,
                avgObjSize: stats.avgObjSize,
                storageSize: stats.storageSize
            }
        }))
        return detailedCollections
    } catch (e) {
        console.error("Failed to get collections", e)
        return []
    }
}

import { encryptHybrid, decryptHybrid } from "@/lib/pqc"
import { getServerKeys } from "@/lib/keys"

export async function getDocuments(collectionName: string = "transactions"): Promise<any[]> {
    await dbConnect()
    if (!mongoose.connection.db) return []

    try {
        const collection = mongoose.connection.db.collection(collectionName)
        const docs = await collection.find({}).sort({ _id: -1 }).limit(100).toArray()

        const { privateKey } = await getServerKeys()

        // Serialize _id and decrypt if PQC data exists
        return await Promise.all(docs.map(async (doc: any) => {
            let decryptedData = null

            if (doc.ciphertext && doc.encapsulation && doc.iv && doc.authTag) {
                try {
                    const decryptedString = await decryptHybrid({
                        ciphertext: doc.ciphertext,
                        encapsulation: doc.encapsulation,
                        iv: doc.iv,
                        authTag: doc.authTag,
                        latencyMs: doc.latencyMs || 0
                    }, privateKey)
                    decryptedData = JSON.parse(decryptedString)
                } catch (e) {
                    // Silently fail if decryption fails (e.g. keys mismatched after restart)
                }
            }

            return {
                ...doc,
                _id: doc._id.toString(),
                timestamp: doc.timestamp ? new Date(doc.timestamp).toISOString() : undefined,
                decryptedData // Injected for Admin View
            }
        }))
    } catch (error) {
        console.error(`Failed to fetch documents from ${collectionName}:`, error)
        return []
    }
}

export async function seedTransactions() {
    await dbConnect()

    const count = await Transaction.countDocuments()
    if (count > 0) return { success: true, message: "Data already seeded" }

    const { publicKey } = await getServerKeys()

    const records = await Promise.all(Array.from({ length: 20 }, async (_, i) => {
        const transactionId = `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        const amount = Math.floor(Math.random() * 10000) + 100
        const currency = "USD"

        const sensitiveData = JSON.stringify({ transactionId, amount, currency })
        const usePQC = i % 2 === 0
        const encrypted = await encryptHybrid(sensitiveData, publicKey)

        return {
            transactionId,
            amount,
            currency,
            status: i % 5 === 0 ? "failed" : i % 3 === 0 ? "processing" : "success",
            encryptionMethod: usePQC ? "ML-KEM-1024 + AES-256" : "AES-256-GCM",
            quantumSafe: usePQC,
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
            ciphertext: encrypted.ciphertext,
            encapsulation: encrypted.encapsulation,
            iv: encrypted.iv,
            authTag: encrypted.authTag,
            latencyMs: encrypted.latencyMs
        }
    }))

    await Transaction.insertMany(records)
    return { success: true, message: "Seeded 20 transactions with real PQC metadata" }
}

export async function seedJobs() {
    await dbConnect()
    if (!mongoose.connection.db) return { success: false, message: "DB not connected" }

    const collection = mongoose.connection.db.collection("jobs")
    const count = await collection.countDocuments()
    if (count > 0) return { success: true, message: "Jobs already seeded" }

    const mockJobs = Array.from({ length: 20 }, (_, i) => ({
        title: ["Quantum Researcher", "Encryption Specialist", "Frontend Dev", "DB Admin"][i % 4],
        department: ["Engineering", "Research", "Security"][i % 3],
        salary: Math.floor(Math.random() * 100000) + 50000,
        remote: i % 2 === 0,
        postedAt: new Date(),
        encryption: "AES-256" // Just to show some field
    }))

    await collection.insertMany(mockJobs)
    return { success: true, message: "Seeded 20 jobs" }
}
export async function nukeDatabase() {
    await dbConnect()
    if (!mongoose.connection.db) return { success: false, message: "Database not connected" }

    try {
        await mongoose.connection.db.dropDatabase()
        return { success: true, message: "Database nuked successfully" }
    } catch (error) {
        console.error("Failed to nuke database:", error)
        return { success: false, message: "Failed to nuke database" }
    }
}
