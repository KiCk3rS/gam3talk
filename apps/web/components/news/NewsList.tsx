"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from '@/i18n/routing';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from 'next-intl';
import { mockNews } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 7; // Number of items per page

interface NewsListProps {
    category?: string;
}

export function NewsList({ category }: NewsListProps) {
    const locale = useLocale() as 'en' | 'fr' | 'es';
    const [currentPage, setCurrentPage] = useState(1);

    // Filter news by category if provided
    const filteredNews = category
        ? mockNews.filter(news => news.category.toLowerCase() === category.toLowerCase())
        : mockNews;

    // Calculate total pages
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

    // Get current items
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination handlers
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-6">
                {currentItems.map((news) => (
                    <Link href={`/news/${news.slug[locale]}`} key={news.id} className="group bg-card border border-border/50 hover:border-primary/50 rounded-xl overflow-hidden transition-all hover:shadow-lg flex flex-col md:flex-row h-full md:h-52">
                        {/* Image */}
                        <div className="relative w-full md:w-1/3 h-48 md:h-full shrink-0 overflow-hidden">
                            <Image
                                src={news.image}
                                alt={news.title[locale]}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                                <Badge className="bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider text-[10px] border-none">
                                    {news.category}
                                </Badge>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col justify-between p-5 md:p-6 w-full">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-wider">
                                    <Clock className="w-3.5 h-3.5" />
                                    {news.date}
                                </div>
                                <h3 className="text-xl md:text-2xl font-black uppercase leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                    {news.title[locale]}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-2 font-medium">
                                    {news.summary[locale]}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                Lire l'article
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-full border-2 border-border/50 hover:border-primary hover:text-primary disabled:opacity-30"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <span className="text-sm font-black uppercase tracking-wider text-muted-foreground">
                        Page <span className="text-foreground">{currentPage}</span> / {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-full border-2 border-border/50 hover:border-primary hover:text-primary disabled:opacity-30"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            )}
        </div>
    );
}
