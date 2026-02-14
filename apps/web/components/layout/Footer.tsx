"use client";

import Link from "next/link";
import Image from "next/image";
import { Command, Facebook, Twitter, Instagram, Twitch, Youtube, Mail, Send, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { mockNews, mockMatches, mockInterviews } from "@/lib/mockData";


export function Footer() {
    const latestNews = mockNews.slice(0, 3);
    const latestInterviews = mockInterviews.slice(0, 3);
    const latestMatches = mockMatches.slice(0, 3);

    return (
        <footer className="bg-card border-t border-border pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Column 1: Brand & Socials */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <Command className="h-8 w-8 text-primary" />
                            <span className="text-2xl font-black uppercase tracking-tighter">Gam3Talk</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            The ultimate destination for esports news, interviews, and match statistics. Stay ahead of the game with Gam3Talk.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Instagram className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Twitch className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Youtube className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Column 2: Latest News */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-bold uppercase tracking-wider text-lg border-l-4 border-primary pl-3">Latest News</h4>
                        <ul className="space-y-4">
                            {latestNews.map((news) => (
                                <li key={news.id}>
                                    <Link href={`/news/${news.id}`} className="group flex gap-3 items-start">
                                        <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-muted">
                                            <Image
                                                src={news.image}
                                                alt={news.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h5 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                {news.title}
                                            </h5>
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground">
                                                {news.date}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Latest Interviews */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-bold uppercase tracking-wider text-lg border-l-4 border-primary pl-3">Interviews</h4>
                        <ul className="space-y-4">
                            {latestInterviews.map((interview) => (
                                <li key={interview.id}>
                                    <Link href={interview.link} className="group flex gap-3 items-start">
                                        <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-muted">
                                            <Image
                                                src={interview.image}
                                                alt={interview.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h5 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 italic">
                                                {interview.title}
                                            </h5>
                                            <span className="text-[10px] uppercase font-bold text-muted-foreground text-primary">
                                                {interview.author}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Matches (Condensed) */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-bold uppercase tracking-wider text-lg border-l-4 border-primary pl-3">Matches</h4>
                        <div className="space-y-3">
                            {latestMatches.map((match) => (
                                <div key={match.id} className="bg-background border border-border/50 p-3 rounded-lg flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold overflow-hidden shrink-0">
                                            {match.team1.logo ? <Image src={match.team1.logo} alt={match.team1.name} width={24} height={24} /> : match.team1.name.charAt(0)}
                                        </div>
                                        <span className="text-xs font-bold truncate">{match.team1.name}</span>
                                    </div>
                                    <div className="px-2 shrink-0">
                                        {match.status === 'live' ? (
                                            <span className="text-xs font-bold text-red-500 animate-pulse">LIVE</span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{match.time || 'VS'}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                                        <span className="text-xs font-bold truncate text-right">{match.team2.name}</span>
                                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold overflow-hidden shrink-0">
                                            {match.team2.logo ? <Image src={match.team2.logo} alt={match.team2.name} width={24} height={24} /> : match.team2.name.charAt(0)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 5: Newsletter & Contact */}
                    <div className="flex flex-col gap-6">
                        <h4 className="font-bold uppercase tracking-wider text-lg border-l-4 border-primary pl-3">Newsletter</h4>
                        <p className="text-sm text-muted-foreground">
                            Subscribe to get the latest esports news directly to your inbox.
                        </p>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="email" placeholder="Email" className="bg-background" />
                            <Button size="icon" className="shrink-0">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>contact@gam3talk.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>123 Esports Ave, Gaming City</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="bg-border/50 mb-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
                    <p>© 2026 Gam3Talk. All rights reserved.</p>
                    <nav className="flex flex-wrap justify-center gap-6">
                        <Link href="/legal" className="hover:text-primary transition-colors">Legal Info</Link>
                        <Link href="/mentions" className="hover:text-primary transition-colors">Legal Mentions</Link>
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Use</Link>
                        <Link href="/sales" className="hover:text-primary transition-colors">Terms of Sale</Link>
                        <Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
