"use client"

import { DataTable } from "@/components/data-grid/data-table"
import { getColumns } from "@/components/data-grid/columns"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ReportButton } from "@/components/pqc/report-button"

interface DashboardDataGridProps {
    data: any[]
    collectionName: string
}

export function DashboardDataGrid({ data, collectionName }: DashboardDataGridProps) {
    const [showCiphertext, setShowCiphertext] = useState(false)

    const tableColumns = useMemo(() => {
        if (collectionName === 'transactions') {
            return getColumns(showCiphertext)
        }

        if (!data || data.length === 0) return []

        const sample = data[0]
        return Object.keys(sample).filter(k => k !== '_id' && k !== 'ciphertext' && k !== 'encapsulation' && k !== 'iv' && k !== 'authTag' && k !== 'latencyMs' && k !== 'decryptedData').map((key): ColumnDef<any> => ({
            accessorKey: key,
            header: key.charAt(0).toUpperCase() + key.slice(1),
            cell: ({ row }) => {
                const doc = row.original as any
                const value = row.getValue(key)

                // If ciphertext mode is on and we are in transactions-like dynamic view
                if (showCiphertext && doc.ciphertext && (key === 'transactionId' || key === 'amount')) {
                    return <div className="font-mono text-[10px] text-muted-foreground truncate w-[100px]">{doc.ciphertext}</div>
                }

                if (key === 'timestamp' || key === 'postedAt') {
                    try {
                        const date = new Date(value as string)
                        if (!isNaN(date.getTime())) {
                            return <div className="text-xs text-muted-foreground">{date.toLocaleString()}</div>
                        }
                    } catch (e) { }
                }
                if (typeof value === 'object' && value !== null) {
                    return <code className="text-xs text-muted-foreground">{JSON.stringify(value)}</code>
                }
                return <div className="font-medium">{String(value)}</div>
            }
        }))
    }, [data, collectionName, showCiphertext])

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="security-preview"
                            checked={showCiphertext}
                            onCheckedChange={setShowCiphertext}
                        />
                        <Label htmlFor="security-preview" className="text-xs font-bold uppercase tracking-tighter">
                            {showCiphertext ? "Database View (Ciphertext)" : "Admin View (Decrypted)"}
                        </Label>
                    </div>
                </div>
                <ReportButton data={data} />
            </div>
            <DataTable columns={tableColumns} data={data} />
        </div>
    )
}
