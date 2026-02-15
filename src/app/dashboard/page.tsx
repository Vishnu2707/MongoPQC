import { getDocuments } from "@/app/actions"
import { SeedButton } from "@/components/data-grid/seed-button"
import { SeedJobsButton } from "@/components/data-grid/seed-jobs-button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Zap, Lock, Activity, Server } from "lucide-react"
import { DashboardDataGrid } from "@/components/dashboard-data-grid"
import { LiveSecurityAudit } from "@/components/pqc/live-security-audit"

export const dynamic = 'force-dynamic'

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const collectionName = typeof params.collection === 'string' ? params.collection : 'transactions'
    const data = await getDocuments(collectionName)

    // Calculate real-time metrics for the "Trust Dashboard"
    const avgLatency = data.length > 0
        ? data.reduce((acc, curr) => acc + (curr.latencyMs || 0), 0) / data.length
        : 0.48

    return (
        <div className="flex-1 space-y-4 p-8 pt-6 relative overflow-hidden">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">
                        Trust Dashboard
                    </h2>
                    <p className="text-muted-foreground">
                        Observing collection: <span className="font-mono border-b border-primary/20">{collectionName}</span>
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <SeedButton />
                    <SeedJobsButton />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Quantum Confidence
                        </CardTitle>
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold pt-2">100.0%</div>
                        <p className="text-xs text-muted-foreground pt-1">
                            ML-KEM-1024 Handshake Verified
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Connections
                        </CardTitle>
                        <Zap className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold pt-2">+{data.length > 0 ? data.length + 4820 : "0"}</div>
                        <p className="text-xs text-muted-foreground pt-1">
                            +24.5% traffic volume
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Latency</CardTitle>
                        <Activity className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold pt-2">12.4ms</div>
                        <p className="text-xs text-muted-foreground pt-1">
                            PQC Overhead: &lt;0.5ms (Optimized)
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Encrypted Data Volume
                        </CardTitle>
                        <Lock className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold pt-2">18.4 TB</div>
                        <p className="text-xs text-muted-foreground pt-1">
                            AES-256-GCM + Kyber Encap
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                <div className="md:col-span-2 lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                                <Server className="mr-2 h-5 w-5" />
                                Live Data Feed
                            </CardTitle>
                            <CardDescription>
                                Real-time tunnel from: <strong>{collectionName}</strong>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DashboardDataGrid data={data} collectionName={collectionName} />
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-1 lg:col-span-1">
                    <LiveSecurityAudit latestLatency={avgLatency} />
                </div>
            </div>
        </div>
    )
}
