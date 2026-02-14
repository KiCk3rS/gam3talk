"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { Twitch } from "lucide-react";

export function TwitchSection() {
    return (
        <section className="py-12 bg-[#9146FF]/5 text-foreground border-b border-border/50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9146FF] rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <SectionHeader
                    title="Live on Twitch"
                    icon={Twitch}
                />

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/3 aspect-video relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/20 group">
                        {/* Placeholder for Twitch Embed */}
                        <Image
                            src="https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=2670&auto=format&fit=crop"
                            alt="Live Stream Placeholder"
                            fill
                            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/60 p-6 rounded-2xl backdrop-blur-md text-center border border-white/10 shadow-2xl transform transition-transform group-hover:scale-105 duration-300">
                                <p className="text-2xl font-black uppercase tracking-tight mb-4 text-white">Live Now: IEM Cologne 2025</p>
                                <Button className="bg-[#9146FF] hover:bg-[#7c2cf2] text-white font-bold uppercase tracking-wider animate-pulse shadow-[0_0_20px_rgba(145,70,255,0.5)]">
                                    Watch Stream
                                </Button>
                            </div>
                        </div>

                        <div className="absolute top-4 left-4">
                            <Badge className="bg-red-600 animate-pulse text-white font-black uppercase border-none">LIVE</Badge>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 flex flex-col justify-center space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">240K Viewers Watching</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-[0.9] text-foreground mb-4">
                                Don't miss the <span className="text-[#9146FF]">action</span>
                            </h2>
                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                Catch the playoffs, analysis desk, and exclusive interviews right here on Gam3Talk. Join the community chat and predict the winners!
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">Recommended Channels</h3>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-[#9146FF] hover:bg-accent/50 transition-all cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-muted overflow-hidden relative ring-2 ring-transparent group-hover:ring-[#9146FF] transition-all">
                                    <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" alt="Avatar" fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-foreground truncate group-hover:text-[#9146FF] transition-colors">ESL_CSGO</p>
                                    <p className="text-xs text-muted-foreground truncate">Counter-Strike 2</p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-[#9146FF] hover:bg-accent/50 transition-all cursor-pointer group">
                                <div className="w-10 h-10 rounded-full bg-muted overflow-hidden relative ring-2 ring-transparent group-hover:ring-[#9146FF] transition-all">
                                    <Image src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100" alt="Avatar" fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-foreground truncate group-hover:text-[#9146FF] transition-colors">LCK_Korea</p>
                                    <p className="text-xs text-muted-foreground truncate">League of Legends</p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                            </div>
                        </div>

                        <Button className="w-full bg-[#9146FF] hover:bg-[#7c2cf2] text-white font-bold uppercase tracking-wider h-12 shadow-lg shadow-[#9146FF]/20">
                            Visit our Twitch Channel
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
