import { auth, signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Activity, Database, ArrowRight } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function LandingPage() {
  const session = await auth()

  // If already logged in, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#0B0E14]">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full opacity-20 animate-[spin_10s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full opacity-30 animate-[spin_15s_linear_infinite_reverse]" />
      </div>

      <div className="z-10 w-full max-w-md px-4">
        <div className="text-center mb-8 space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ShieldCheck className="w-12 h-12 text-primary animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent sm:text-5xl">
            PQMongo Explorer
          </h1>
          <p className="text-muted-foreground text-lg">
            Secure your data in the Post-Quantum Era.
          </p>
        </div>

        <Card className="border-white/10 glass backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Enter the Quantum Realm
            </CardTitle>
            <CardDescription>
              Authenticate with GitHub to access the secure dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-4">
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/50 transition-colors">
                <Activity className="w-5 h-5 mb-2 text-primary" />
                <span>ML-KEM-1024</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-white/5 border border-white/5 hover:border-secondary/50 transition-colors">
                <Database className="w-5 h-5 mb-2 text-secondary" />
                <span>MongoDB Atlas</span>
              </div>
            </div>

            <form
              action={async () => {
                "use server"
                await signIn("github", { redirectTo: "/dashboard" })
              }}
            >
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white font-bold h-11" type="submit">
                <span className="mr-2">Continue with GitHub</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Protected by Hybrid Post-Quantum Cryptography</p>
          <p className="text-xs opacity-50 mt-1">NIST Level 3 Security • ISO 27001</p>
        </div>
      </div>
    </div>
  )
}
