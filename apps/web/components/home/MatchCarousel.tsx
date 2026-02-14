"use client";

import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockMatches } from "@/lib/mockData";

export function MatchCarousel() {
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
                    {mockMatches.map((match) => (
                        <CarouselItem key={match.id} className="pl-0 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
                            <Card className="rounded-none border-y-0 border-l-0 border-r border-border/40 bg-card/60 backdrop-blur-sm shadow-none cursor-pointer">
                                <CardContent className="flex flex-col items-center justify-center p-3 h-[110px]">
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                                        {match.game}
                                    </div>

                                    <div className="flex items-center justify-between w-full gap-2">
                                        <div className="flex flex-col items-center gap-1 flex-1">
                                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                                                {match.team1.name.substring(0, 1)}
                                            </div>
                                            <span className="font-bold text-xs text-center truncate w-full">{match.team1.name}</span>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            {match.status === 'live' ? (
                                                <div className="px-1.5 py-0.5 bg-red-500/10 text-red-500 rounded-[2px] text-[10px] font-bold animate-pulse">
                                                    LIVE
                                                </div>
                                            ) : (
                                                <span className="text-[10px] text-muted-foreground font-medium">VS</span>
                                            )}
                                            <div className="text-sm font-bold my-0.5">
                                                {match.status === 'upcoming' ? match.time : match.score}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center gap-1 flex-1">
                                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                                                {match.team2.name.substring(0, 1)}
                                            </div>
                                            <span className="font-bold text-xs text-center truncate w-full">{match.team2.name}</span>
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
