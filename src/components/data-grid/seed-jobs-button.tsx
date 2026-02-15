"use client"

import { Button } from "@/components/ui/button"
import { Briefcase } from "lucide-react"
import { seedJobs } from "@/app/actions"
import { useState } from "react"

export function SeedJobsButton() {
    const [loading, setLoading] = useState(false)

    async function handleSeed() {
        setLoading(true)
        const result = await seedJobs()
        if (result.success) {
            alert(result.message)
            window.location.reload()
        } else {
            alert("Failed: " + result.message)
        }
        setLoading(false)
    }

    return (
        <Button onClick={handleSeed} variant="outline" disabled={loading}>
            <Briefcase className="mr-2 h-4 w-4" />
            {loading ? "Seeding..." : "Seed Jobs"}
        </Button>
    )
}
