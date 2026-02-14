"use client";

import { mockNews } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface RelatedArticlesProps {
    currentSlug: string;
    category: string;
    locale: 'en' | 'fr' | 'es';
}

export function RelatedArticles({ currentSlug, category, locale }: RelatedArticlesProps) {
    // Filter articles: same category, not current article, max 3
    const relatedArticles = mockNews
        .filter(article => article.category === category && article.slug[locale] !== currentSlug)
        .slice(0, 3);

    if (relatedArticles.length === 0) return null;

    return (
        <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-2">
                <span className="bg-primary w-2 h-8 rounded-full"></span>
                Related News
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/${locale}/news/${article.slug[locale]}`}
                        className="group flex flex-col gap-4"
                    >
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/50 group-hover:border-primary/50 transition-colors">
                            <Image
                                src={article.image}
                                alt={article.title[locale]}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-2 left-2">
                                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs font-bold">
                                    {article.category}
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                <span>{article.date}</span>
                            </div>
                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                {article.title[locale]}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <Link
                    href={`/${locale}/news`}
                    className="inline-flex items-center gap-2 text-primary font-bold uppercase text-sm hover:underline hover:text-primary/80 transition-all"
                >
                    View more news <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
