"use server"

import dbConnect from "@/lib/db"
import Transaction, { ITransaction } from "@/models/Transaction"
import { PaymentDocument } from "@/components/data-grid/schema"

export async function getTransactions(): Promise<PaymentDocument[]> {
    await dbConnect()

    try {
        const transactions = await Transaction.find({}).sort({ timestamp: -1 }).limit(100).lean()

        return transactions.map((tx: any) => ({
            id: tx._id.toString(),
            transactionId: tx.transactionId,
            amount: tx.amount,
            currency: tx.currency,
            status: tx.status,
            encryptionMethod: tx.encryptionMethod,
            quantumSafe: tx.quantumSafe,
            timestamp: tx.timestamp.toISOString(),
        }))
    } catch (error) {
        console.error("Failed to fetch transactions:", error)
        return []
    }
}

export async function seedTransactions() {
    await dbConnect()

    // Check if data exists
    const count = await Transaction.countDocuments()
    if (count > 0) return { success: true, message: "Data already seeded" }

    const mockData = Array.from({ length: 50 }, (_, i) => ({
        transactionId: `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        amount: Math.floor(Math.random() * 10000) + 100,
        currency: "USD",
        status: i % 5 === 0 ? "failed" : i % 3 === 0 ? "processing" : "success",
        encryptionMethod: i % 2 === 0 ? "ML-KEM-1024 + AES-256" : "AES-256-GCM",
        quantumSafe: i % 2 === 0,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
    }))

    await Transaction.insertMany(mockData)
    return { success: true, message: "Seeded 50 transactions" }
}
