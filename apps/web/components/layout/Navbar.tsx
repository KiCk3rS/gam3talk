import Link from "next/link";
import { Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        GAM3TALK
                    </span>
                </Link>
                <div className="hidden md:flex md:flex-1">
                    <Link
                        href="/news"
                        className="transition-colors hover:text-foreground/80 text-foreground/60 mr-6 text-sm font-medium"
                    >
                        News
                    </Link>
                    <Link
                        href="/matches"
                        className="transition-colors hover:text-foreground/80 text-foreground/60 mr-6 text-sm font-medium"
                    >
                        Matches
                    </Link>
                    <Link
                        href="/rankings"
                        className="transition-colors hover:text-foreground/80 text-foreground/60 mr-6 text-sm font-medium"
                    >
                        Rankings
                    </Link>
                    <Link
                        href="/community"
                        className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium"
                    >
                        Community
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <div className="w-full max-w-[200px] lg:max-w-xs relative hidden sm:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search..."
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Profile</span>
                    </Button>
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Menu</span>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
