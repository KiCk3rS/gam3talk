"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, ArrowRight, Radio, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockNews, mockMatches } from "@/lib/mockData";
import { SectionHeader } from "@/components/ui/section-header";

export function NewsAndMatches() {
    // Slice news for display
    const newsList = mockNews.slice(0, 6);

    // Filter matches
    const liveMatches = mockMatches.filter(m => m.status === 'live');
    const upcomingMatches = mockMatches.filter(m => m.status === 'upcoming').slice(0, 5);
    const trendingNews = mockNews.slice(1, 6); // Just taking some news for trending

    return (
        <section className="py-12 bg-background text-foreground">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: News (8 cols) */}
                    <div className="lg:col-span-8">
                        <SectionHeader
                            title="Latest News"
                            icon={Newspaper}
                        />

                        <div className="flex flex-col gap-8">
                            {/* Featured Article */}
                            {newsList.length > 0 && (
                                <Link href={`/news/${newsList[0].id}`} className="group block relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden">
                                    <Image
                                        src={newsList[0].image}
                                        alt={newsList[0].title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 z-10">
                                        <Badge className="bg-primary text-primary-foreground font-bold uppercase tracking-wider text-xs border-none">
                                            {newsList[0].category}
                                        </Badge>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-6 w-full md:w-3/4">
                                        <div className="flex items-center gap-3 mb-3 text-xs text-gray-300 font-medium uppercase tracking-wider">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {newsList[0].date}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-black uppercase leading-none text-white mb-3 group-hover:text-primary transition-colors">
                                            {newsList[0].title}
                                        </h3>
                                        <p className="text-gray-300 line-clamp-2 md:text-lg font-medium">
                                            {newsList[0].summary}
                                        </p>
                                    </div>
                                </Link>
                            )}

                            {/* List of articles */}
                            <div className="flex flex-col gap-6">
                                {newsList.slice(1).map((news) => (
                                    <Link href={`/news/${news.id}`} key={news.id} className="group flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                                        <div className="relative w-full md:w-1/3 aspect-video shrink-0 rounded-lg overflow-hidden">
                                            <Image
                                                src={news.image}
                                                alt={news.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 py-1">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-wider">
                                                <span className="text-primary">{news.category}</span>
                                                <span className="text-border">|</span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {news.date}
                                                </span>
                                            </div>
                                            <h3 className="text-lg md:text-xl font-black uppercase leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                {news.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2 hidden md:block">
                                                {news.summary}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Trending & Matches (4 cols) */}
                    <div className="lg:col-span-4 space-y-10">

                        {/* Trending News */}
                        <div>
                            <SectionHeader
                                title="Trending"
                                icon={TrendingUp}
                                className="mb-6"
                            />
                            <div className="flex flex-col gap-4">
                                {trendingNews.map((item, idx) => (
                                    <Link href={`/news/${item.id}`} key={`trend-${idx}`} className="group flex gap-4 items-start p-2 rounded-lg hover:bg-accent/50 transition-colors">
                                        <div className="relative w-20 h-16 shrink-0 rounded overflow-hidden bg-muted">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">{item.category}</span>
                                            <h4 className="text-sm font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                {item.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                <span>{item.date}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Matches */}
                        <div>
                            <SectionHeader
                                title="Match Center"
                                icon={Radio}
                                className="mb-6"
                            />

                            <div className="space-y-4">
                                {liveMatches.map((match) => (
                                    <div key={match.id} className="bg-card border border-primary/20 rounded-xl overflow-hidden shadow-sm relative group cursor-pointer">
                                        <div className="absolute top-0 right-0 p-2">
                                            <Badge variant="destructive" className="animate-pulse text-[10px] font-bold uppercase">Live</Badge>
                                        </div>
                                        <div className="p-4">
                                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 text-center">{match.game}</div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col items-center gap-2 flex-1">
                                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-lg border border-border overflow-hidden">
                                                        {match.team1.logo ? (
                                                            <Image src={match.team1.logo} alt={match.team1.name} width={40} height={40} className="object-cover" />
                                                        ) : (
                                                            match.team1.name.substring(0, 1)
                                                        )}
                                                    </div>
                                                    <span className="font-bold text-xs text-center">{match.team1.name}</span>
                                                </div>
                                                <div className="flex flex-col items-center px-4">
                                                    <span className="text-2xl font-black text-primary tabular-nums tracking-tight">{match.score}</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-2 flex-1">
                                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-lg border border-border overflow-hidden">
                                                        {match.team2.logo ? (
                                                            <Image src={match.team2.logo} alt={match.team2.name} width={40} height={40} className="object-cover" />
                                                        ) : (
                                                            match.team2.name.substring(0, 1)
                                                        )}
                                                    </div>
                                                    <span className="font-bold text-xs text-center">{match.team2.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-accent/50 p-2 text-center">
                                            <Button size="sm" variant="ghost" className="w-full text-xs font-bold uppercase hover:text-primary h-6">Watch Live</Button>
                                        </div>
                                    </div>
                                ))}

                                {upcomingMatches.map((match) => (
                                    <div key={match.id} className="bg-card border border-border/60 rounded-xl overflow-hidden shadow-sm hover:border-primary/50 transition-colors group cursor-pointer">
                                        <div className="p-3 flex items-center justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs border border-border overflow-hidden">
                                                    {match.team1.logo ? (
                                                        <Image src={match.team1.logo} alt={match.team1.name} width={32} height={32} className="object-cover" />
                                                    ) : (
                                                        match.team1.name.substring(0, 1)
                                                    )}
                                                </div>
                                                <span className="font-bold text-sm">{match.team1.name}</span>
                                            </div>
                                            <div className="px-3 flex flex-col items-center">
                                                <span className="text-xs font-bold text-muted-foreground uppercase bg-muted/50 px-2 py-0.5 rounded">{match.time}</span>
                                            </div>
                                            <div className="flex items-center gap-3 flex-1 justify-end">
                                                <span className="font-bold text-sm text-right">{match.team2.name}</span>
                                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs border border-border overflow-hidden">
                                                    {match.team2.logo ? (
                                                        <Image src={match.team2.logo} alt={match.team2.name} width={32} height={32} className="object-cover" />
                                                    ) : (
                                                        match.team2.name.substring(0, 1)
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Button variant="outline" className="w-full font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-primary-foreground border-primary/20 hover:border-primary transition-all">
                                    View All Matches <ArrowRight className="w-3 h-3 ml-2" />
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
