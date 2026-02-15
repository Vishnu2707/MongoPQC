import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertCircle, Trash2, Cpu, CheckCircle2 } from "lucide-react"
import { NukeButton } from "@/components/settings/nuke-button"

export default function SettingsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Settings
                </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card className="border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center neon-text-cyan">
                            <Cpu className="mr-2 h-5 w-5 text-primary" />
                            PQC Configuration
                        </CardTitle>
                        <CardDescription>
                            Manage Post-Quantum Cryptography operational settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                                <Label htmlFor="pqc-mode">Enable ML-KEM-1024</Label>
                                <p className="text-sm text-muted-foreground">
                                    Enforce Kyber key encapsulation for all new transactions.
                                </p>
                            </div>
                            <Switch id="pqc-mode" defaultChecked={true} disabled />
                        </div>
                        <div className="flex items-center justify-between space-x-2">
                            <div className="space-y-0.5">
                                <Label htmlFor="hybrid-mode">Hybrid Mode</Label>
                                <p className="text-sm text-muted-foreground">
                                    Combine PQC with classical AES-256-GCM (FIPS 140-3).
                                </p>
                            </div>
                            <Switch id="hybrid-mode" defaultChecked={true} disabled />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-destructive/20">
                    <CardHeader>
                        <CardTitle className="flex items-center text-destructive">
                            <AlertCircle className="mr-2 h-5 w-5" />
                            Danger Zone
                        </CardTitle>
                        <CardDescription>
                            Irreversible actions for database management.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-destructive">Purge All Data</Label>
                                <p className="text-sm text-muted-foreground">
                                    dropDatabase() - Permanently delete all collections.
                                </p>
                            </div>
                            <NukeButton />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-green-500/20 col-span-full">
                    <CardHeader>
                        <CardTitle className="flex items-center text-green-500">
                            <CheckCircle2 className="mr-2 h-5 w-5" />
                            System Health
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col space-y-1">
                                <span className="text-sm text-muted-foreground">MongoDB Connection</span>
                                <span className="font-mono text-green-400">Connected (Atlas)</span>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <span className="text-sm text-muted-foreground">PQC Library</span>
                                <span className="font-mono text-green-400">liboqs-node (Active)</span>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <span className="text-sm text-muted-foreground">Server Region</span>
                                <span className="font-mono text-foreground">aws-us-east-1</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
