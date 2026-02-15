import { DataTable } from "@/components/data-grid/data-table"
import { columns } from "@/components/data-grid/columns"
import { getTransactions } from "@/app/actions"
import { SeedButton } from "@/components/data-grid/seed-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Zap, Lock, Activity } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const data = await getTransactions()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <SeedButton />
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
                        <div className="text-2xl font-bold">98.5%</div>
                        <p className="text-xs text-muted-foreground">
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
                        <div className="text-2xl font-bold">+{data.length > 0 ? "2350" : "0"}</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last hour
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Handshake Latency</CardTitle>
                        <Activity className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18.2ms</div>
                        <p className="text-xs text-muted-foreground">
                            Avg. overhead +1.2ms (Kyber)
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Encrypted Data Volume
                        </CardTitle>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.2 GB</div>
                        <p className="text-xs text-muted-foreground">
                            All data in motion secure
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 grid-cols-1">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={data} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
