"use client"

import { ColumnDef } from "@tanstack/react-table"
import { PaymentDocument } from "./schema"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ShieldCheck, AlertTriangle } from "lucide-react"

export const getColumns = (showCiphertext: boolean): ColumnDef<any>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "transactionId",
        header: "Transaction ID",
        cell: ({ row }) => {
            const doc = row.original as any
            if (showCiphertext && doc.ciphertext) {
                return <div className="font-mono text-[10px] text-muted-foreground truncate w-[100px]" title={doc.ciphertext}>{doc.ciphertext}</div>
            }
            return <div className="font-mono">{row.getValue("transactionId")}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            return (
                <Badge variant={status === "success" ? "outline" : "secondary"} className={
                    status === "success" ? "border-green-500 text-green-500" :
                        status === "failed" ? "border-red-500 text-red-500" : ""
                }>
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const doc = row.original as any
            if (showCiphertext && doc.ciphertext) {
                return <div className="text-right font-mono text-[10px] text-muted-foreground truncate" title={doc.ciphertext}>[ENC]</div>
            }
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "encryptionMethod",
        header: "Encryption",
        cell: ({ row }) => {
            const method = row.getValue("encryptionMethod") as string
            const isQuantum = (row.original as any).quantumSafe
            return (
                <div className="flex items-center space-x-2">
                    {isQuantum ? <ShieldCheck className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    <span className={isQuantum ? "text-green-500" : "text-yellow-500"}>{method}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "timestamp",
        header: "Timestamp",
        cell: ({ row }) => {
            const date = new Date(row.getValue("timestamp"))
            return <div className="text-muted-foreground text-xs" suppressHydrationWarning>{date.toLocaleString()}</div>
        }
    }
]
