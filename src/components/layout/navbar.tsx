import Link from "next/link"
import { ShieldCheck, Activity, Database, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Lock className="h-6 w-6" />
                        <span className="hidden font-bold sm:inline-block">
                            PQMongo Explorer
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/dashboard"
                            className="transition-colors hover:text-foreground/80 text-foreground"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/collections"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Collections
                        </Link>
                        <Link
                            href="/settings"
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            Settings
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search or command menu could go here */}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-green-500/50 text-green-500 bg-green-500/10 hidden sm:flex">
                            <ShieldCheck className="mr-1 h-3 w-3" />
                            Quantum Secure
                        </Badge>
                        <Badge variant="outline" className="border-blue-500/50 text-blue-500 bg-blue-500/10 hidden sm:flex">
                            <Activity className="mr-1 h-3 w-3" />
                            ML-KEM-1024
                        </Badge>
                        <ModeToggle />
                        <UserNav />
                    </div>
                </div>
            </div>
        </header>
    )
}

import { auth, signIn, signOut } from "@/auth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

async function UserNav() {
    const session = await auth()

    if (!session?.user) {
        return (
            <form action={async () => {
                "use server"
                await signIn("github")
            }}>
                <Button variant="outline" size="sm">Sign In</Button>
            </form>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                        <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session.user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <form action={async () => {
                        "use server"
                        await signOut()
                    }} className="w-full">
                        <button className="w-full text-left">Log out</button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
