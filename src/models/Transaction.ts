import mongoose, { Schema, Document } from 'mongoose'

export interface ITransaction extends Document {
    transactionId: string
    amount: number
    currency: string
    status: "pending" | "processing" | "success" | "failed"
    encryptionMethod: "AES-256-GCM" | "ML-KEM-1024 + AES-256"
    quantumSafe: boolean
    timestamp: Date
    ciphertext?: string
    encapsulation?: string
    iv?: string
    authTag?: string
    latencyMs?: number
}

const TransactionSchema: Schema = new Schema({
    transactionId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "USD" },
    status: { type: String, enum: ["pending", "processing", "success", "failed"], default: "pending" },
    encryptionMethod: { type: String, default: "AES-256-GCM" },
    quantumSafe: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
    ciphertext: { type: String },
    encapsulation: { type: String },
    iv: { type: String },
    authTag: { type: String },
    latencyMs: { type: Number },
})

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema)
