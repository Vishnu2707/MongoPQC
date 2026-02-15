import { getCollections } from "@/app/actions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Database, HardDrive, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const dynamic = 'force-dynamic'

export default async function CollectionsPage() {
    const collections = await getCollections()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />

            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                    Database Collections
                </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {collections.map((col) => (
                    <Card key={col.name} className="border-primary/20 hover:border-primary/50 transition-colors group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-medium neon-text-cyan flex items-center">
                                <Database className="mr-2 h-4 w-4 text-primary" />
                                {col.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 mt-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center text-muted-foreground">
                                        <FileText className="mr-2 h-4 w-4" /> Documents
                                    </span>
                                    <span className="font-bold text-foreground">{col.count.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center text-muted-foreground">
                                        <HardDrive className="mr-2 h-4 w-4" /> Size
                                    </span>
                                    <span className="font-mono text-foreground">{(col.size / 1024).toFixed(2)} KB</span>
                                </div>

                                <Link href={`/dashboard?collection=${col.name}`} className="block pt-2">
                                    <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20 group-hover:neon-border">
                                        Explore Data <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {collections.length === 0 && (
                    <div className="col-span-full text-center p-12 text-muted-foreground">
                        No collections found. Seed some data in the Dashboard!
                    </div>
                )}
            </div>
        </div>
    )
}
