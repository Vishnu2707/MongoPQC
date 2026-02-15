"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { seedTransactions } from "@/app/actions"
import { Loader2, Database } from "lucide-react"
import { useRouter } from "next/navigation"

export function SeedButton() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSeed = async () => {
        setLoading(true)
        try {
            const result = await seedTransactions()
            if (result.success) {
                router.refresh()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button variant="outline" size="sm" onClick={handleSeed} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
            {loading ? "Seeding..." : "Seed Mock Data"}
        </Button>
    )
}
