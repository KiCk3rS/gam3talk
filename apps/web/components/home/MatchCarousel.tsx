"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function MatchCarousel() {
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('/api/strapi/matches?limit=10');
                const data = await response.json();
                setMatches(data.data || []);
            } catch (error) {
                console.error("Failed to fetch matches:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    if (loading) {
        return (
            <div className="w-full bg-background border-b border-border/40 py-3">
                <div className="flex gap-4 px-4 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="min-w-[200px] h-[110px] bg-muted animate-pulse rounded-md" />
                    ))}
                </div>
            </div>
        );
    }

    if (matches.length === 0) return null;

    return (
        <div className="w-full bg-background border-b border-border/40">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-0">
                    {matches.map((match) => (
                        <CarouselItem key={match.id} className="pl-0 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
                            <Card className="rounded-none border-y-0 border-l-0 border-r border-border/40 bg-card/60 backdrop-blur-sm shadow-none cursor-pointer">
                                <CardContent className="flex flex-col items-center justify-center p-3 h-[110px]">
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                                        {match.game?.name || "Esport"}
                                    </div>

                                    <div className="flex items-center justify-between w-full gap-2">
                                        <div className="flex flex-col items-center gap-1 flex-1">
                                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                                                {match.teamHome?.substring(0, 1)}
                                            </div>
                                            <span className="font-bold text-xs text-center truncate w-full">{match.teamHome}</span>
                                        </div>

                                        <div className="flex flex-col items-center min-w-[60px]">
                                            {match.status === 'live' ? (
                                                <div className="px-1.5 py-0.5 bg-red-500/10 text-red-500 rounded-[2px] text-[10px] font-bold animate-pulse">
                                                    LIVE
                                                </div>
                                            ) : (
                                                <span className="text-[10px] text-muted-foreground font-medium uppercase">{match.status}</span>
                                            )}
                                            <div className="text-sm font-bold my-0.5">
                                                {match.status === 'upcoming'
                                                    ? new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                    : match.score || 'VS'}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center gap-1 flex-1">
                                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                                                {match.teamAway?.substring(0, 1)}
                                            </div>
                                            <span className="font-bold text-xs text-center truncate w-full">{match.teamAway}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
