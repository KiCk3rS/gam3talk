"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Share2, Facebook, Twitter, Youtube, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    author: string;
    date: string;
    comments?: number;
    duration?: string;
    description?: string;
    category?: string;
    views?: string;
}

const SAMPLE_VIDEOS: Video[] = [
    {
        id: "1",
        title: "WE REVIEWED THE NEW MAGIMONS GAME - VIDEO REVIEW",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
        author: "Vollaire",
        date: "December 15th, 2025",
        comments: 130,
        duration: "03:22",
        description: "In this video review you'll be able to see what works and what doesn't in the new game. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        category: "GAME REVIEWS",
    },
    {
        id: "2",
        title: "GAMEPLAY TRAILER FOR THE NEW LEGEND OF KENJI GAME",
        thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=900&auto=format&fit=crop",
        author: "Dexter",
        date: "Dec 15th, 2025",
        duration: "04:15",
    },
    {
        id: "3",
        title: "WATCH THE BEST MATCH OF THE PRO SOCCER 2025 WORLD CUP",
        thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=900&auto=format&fit=crop",
        author: "Vollaire",
        date: "Dec 15th, 2025",
        duration: "10:30",
    },
    {
        id: "4",
        title: "GALAXY ADVENTURE RX PEEK AT THE NEW WEAPONS",
        thumbnail: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=900&auto=format&fit=crop",
        author: "Dexter",
        date: "Dec 15th, 2025",
        duration: "08:12",
    },
    {
        id: "5",
        title: "RISE OF DEPREDATORS LAUNCHED ITS CINEMATIC TRAILER",
        thumbnail: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=900&auto=format&fit=crop",
        author: "Faye V.",
        date: "Dec 13th, 2025",
        duration: "02:45",
    },
    {
        id: "6",
        title: "WATCH CROWD HIGHLIGHTS OF THE XENOWATCH SEMIFINALS",
        thumbnail: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=900&auto=format&fit=crop",
        author: "Dexter",
        date: "Dec 15th, 2025",
        duration: "05:55",
    },
];

export function YoutubeSection() {
    const [activeVideo, setActiveVideo] = useState<Video>(SAMPLE_VIDEOS[0]);

    return (
        <section className="py-12 bg-card text-card-foreground border-y border-border/50">
            <div className="container mx-auto px-4">
                <SectionHeader
                    title="Latest Videos"
                    icon={Video}
                />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Video Player Area */}
                    <div className="w-full lg:w-2/3">
                        {/* Video Player Placeholder */}
                        <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden group mb-6 border border-border/50 shadow-2xl">
                            <Image
                                src={activeVideo.thumbnail}
                                alt={activeVideo.title}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />

                            {/* Overlay Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                                {/* Play Button */}
                                <button className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center text-primary-foreground shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:scale-110 hover:bg-primary transition-all duration-300 mb-6 cursor-pointer">
                                    <Play fill="currentColor" className="w-8 h-8 ml-1" />
                                </button>

                                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="bg-black/60 border-white/20 text-white hover:bg-white hover:text-black transition-colors gap-2 backdrop-blur-sm">
                                        <Youtube className="w-4 h-4 text-red-500" />
                                        Watch on YouTube
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Video Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                {activeVideo.category && (
                                    <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0.5 uppercase rounded-sm bg-secondary text-secondary-foreground">
                                        {activeVideo.category}
                                    </Badge>
                                )}
                                <Badge className="text-[10px] font-bold px-2 py-0.5 uppercase rounded-sm bg-primary text-primary-foreground hover:bg-primary">
                                    GAME REVIEWS
                                </Badge>
                            </div>

                            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-[1.1] text-foreground">
                                {activeVideo.title}
                            </h2>

                            <div className="flex items-center text-muted-foreground text-xs font-bold uppercase tracking-wider gap-2">
                                <span className="text-primary">By {activeVideo.author}</span>
                                <span className="text-border">|</span>
                                <span>{activeVideo.date}</span>
                                {activeVideo.comments && (
                                    <>
                                        <span className="text-border">|</span>
                                        <span className="text-primary">{activeVideo.comments} Comments</span>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-4 items-start border-b border-border/50 pb-6 mb-6">
                                <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded-sm">{activeVideo.duration}</span>
                                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                                    {activeVideo.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button className="w-9 h-9 rounded bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition shadow-sm cursor-pointer">
                                    <Facebook className="w-4 h-4 play-fill" />
                                </button>
                                <button className="w-9 h-9 rounded bg-[#1da1f2] flex items-center justify-center text-white hover:opacity-90 transition shadow-sm cursor-pointer">
                                    <Twitter className="w-4 h-4 play-fill" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Video List Sidebar */}
                    <div className="w-full lg:w-1/3 flex flex-col">
                        <div className="space-y-2 flex-1">
                            {SAMPLE_VIDEOS.map((video) => (
                                <div
                                    key={video.id}
                                    className={cn(
                                        "flex gap-4 p-3 rounded-xl cursor-pointer transition-all border group",
                                        activeVideo.id === video.id
                                            ? "bg-accent border-primary/20 shadow-inner"
                                            : "border-transparent hover:bg-accent/50 hover:border-border"
                                    )}
                                    onClick={() => setActiveVideo(video)}
                                >
                                    <div className="relative w-28 h-18 flex-shrink-0 bg-muted rounded-lg overflow-hidden border border-border/50 group-hover:border-primary/50 transition-colors">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                            <div className="w-6 h-6 rounded-full bg-black/50 border border-white/50 flex items-center justify-center">
                                                <Play fill="white" className="w-2.5 h-2.5 text-white ml-0.5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center gap-1.5 min-w-0">
                                        <h3 className={cn(
                                            "text-xs font-bold uppercase leading-tight line-clamp-2 transition-colors",
                                            activeVideo.id === video.id ? "text-primary" : "text-foreground group-hover:text-primary"
                                        )}>
                                            {video.title}
                                        </h3>
                                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase truncate">
                                            <span className="text-primary truncate">{video.author}</span>
                                            <span className="text-border">|</span>
                                            <span>{video.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider rounded-xl h-12 shadow-lg shadow-primary/20">
                                Browse More Videos...
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
