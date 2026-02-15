"use client"

import { DataTable } from "./data-table"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

interface DynamicDataTableProps {
    data: any[]
    defaultColumns?: ColumnDef<any>[]
}

export function DynamicDataTable({ data, defaultColumns }: DynamicDataTableProps) {
    const columns = useMemo(() => {
        if (defaultColumns) return defaultColumns
        if (!data || data.length === 0) return []

        const sample = data[0]
        return Object.keys(sample).filter(k => k !== '_id').map((key): ColumnDef<any> => ({
            accessorKey: key,
            header: key.charAt(0).toUpperCase() + key.slice(1),
            cell: ({ row }) => {
                const value = row.getValue(key)
                if (key === 'timestamp' || key === 'postedAt') {
                    // Try to parse as date
                    const date = new Date(value as string)
                    if (!isNaN(date.getTime())) {
                        return <div className="text-xs text-muted-foreground">{date.toLocaleString()}</div>
                    }
                }
                if (typeof value === 'object' && value !== null) {
                    return <code className="text-xs">{JSON.stringify(value)}</code>
                }
                return <div className="font-medium">{String(value)}</div>
            }
        }))
    }, [data, defaultColumns])

    return <DataTable columns={columns} data={data} />
}
