"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useFormStatus } from "react-dom"
import { nukeDatabase } from "@/app/actions"
import { useState } from "react"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button variant="destructive" type="submit" disabled={pending}>
            <Trash2 className="mr-2 h-4 w-4" />
            {pending ? "Nuking..." : "Nuke Database"}
        </Button>
    )
}

export function NukeButton() {
    const [message, setMessage] = useState<string | null>(null)

    async function clientAction() {
        if (!confirm("Are you SURE? This will delete ALL data.")) return

        const result = await nukeDatabase()
        if (result.success) {
            alert("Database nuked! Reloading...")
            window.location.reload()
        } else {
            alert("Failed: " + result.message)
        }
    }

    return (
        <form action={clientAction}>
            <SubmitButton />
        </form>
    )
}
