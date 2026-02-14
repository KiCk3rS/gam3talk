"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { MessageSquareQuote } from "lucide-react";
import { Button } from "@/components/ui/button";

import { mockInterviews } from "@/lib/mockData";

export function InterviewsSection() {
    return (
        <section className="py-12 bg-background text-foreground border-b border-border/50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <SectionHeader
                        title="Interviews"
                        icon={MessageSquareQuote}
                        className="mb-0 border-none pb-0"
                    />
                    <Button variant="link" asChild className="text-muted-foreground uppercase font-black tracking-widest hover:text-primary transition-colors">
                        <Link href="/interviews">
                            See All Interviews
                        </Link>
                    </Button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockInterviews.map((interview) => (
                        <Link href={interview.link} key={interview.id} className="group block">
                            <article className="flex flex-col gap-3 h-full p-4 rounded-xl hover:bg-card hover:shadow-lg transition-all duration-300 border border-transparent hover:border-border/50">
                                {/* Image */}
                                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted shadow-sm">
                                    <Image
                                        src={interview.image}
                                        alt={interview.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Content */}
                                <div className="space-y-3 flex-1 flex flex-col">
                                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-3 italic">
                                        {interview.title}
                                    </h3>
                                    <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                        <span className="text-primary truncate max-w-[100px]">{interview.author}</span>
                                        <span className="text-border">|</span>
                                        <span>{interview.date}</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
