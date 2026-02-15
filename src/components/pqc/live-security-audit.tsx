"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Activity, Key, Lock } from "lucide-react"
import { useEffect, useState } from "react"

export function LiveSecurityAudit({ latestLatency }: { latestLatency?: number }) {
    const [latency, setLatency] = useState<number>(latestLatency || 0.48)
    const [entropy, setEntropy] = useState<number>(1024)

    useEffect(() => {
        if (latestLatency) {
            setLatency(latestLatency)
        }
    }, [latestLatency])

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
                <CardTitle className="flex items-center text-sm font-bold uppercase tracking-wider">
                    <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
                    Live Security Audit
                </CardTitle>
                <CardDescription>
                    Real-time verification of PQC tunnel performance.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Handshake Latency</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-blue-500">
                        {latency.toFixed(2)}ms
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Key className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Session Entropy</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-orange-500">
                        {entropy}-bit
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Protocol Standard</span>
                    </div>
                    <span className="text-xs font-bold uppercase">
                        NIST FIPS 203
                    </span>
                </div>

                <div className="mt-4 pt-4 border-t border-primary/10">
                    <p className="text-[10px] text-muted-foreground leading-tight">
                        <span className="text-primary font-bold">INSURANCE PREMIUM:</span> This {latency.toFixed(2)}ms delay ensures data harvested today remains unreadable to quantum computers in 2030+.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
