"use client";

import { useState, useEffect } from "react";
import { MessageCircle, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Rss } from "lucide-react";
import { Link } from '@/i18n/routing';
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getSlugFromCategory } from "@/lib/slugUtils";

const ITEMS_PER_PAGE = 8;

interface LastNewsSidebarProps {
    initialCategory?: string;
}

export function LastNewsSidebar({ initialCategory }: LastNewsSidebarProps) {
    const [activePage, setActivePage] = useState(1);
    const [selectedGame, setSelectedGame] = useState(initialCategory || "Tous les jeux");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [newsItems, setNewsItems] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);

    // Fetch categories
    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await fetch('/api/strapi/categories');
                const data = await response.json();
                setCategories(data.data || []);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchMetadata();
    }, []);

    // Fetch news items
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const categoryParam = selectedGame === "Tous les jeux" ? "" : `&category=${getSlugFromCategory(selectedGame)}`;
                const start = (activePage - 1) * ITEMS_PER_PAGE;
                const response = await fetch(`/api/strapi/articles?limit=${ITEMS_PER_PAGE}&start=${start}${categoryParam}`);
                const data = await response.json();
                setNewsItems(data.data || []);
                setTotalItems(data.meta?.pagination?.total || 0);
            } catch (error) {
                console.error("Failed to fetch sidebar news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [selectedGame, activePage]);

    // Sync state with prop if it changes
    useEffect(() => {
        if (initialCategory) {
            setSelectedGame(initialCategory);
        } else {
            setSelectedGame("Tous les jeux");
        }
        setActivePage(1);
    }, [initialCategory]);

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setActivePage(newPage);
        }
    };

    const displayCategories = ["Tous les jeux", ...categories.map(c => c.name)];

    return (
        <Card className="bg-card border-none shadow-none text-foreground">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-8">
                <SectionHeader
                    title="Actu Esport"
                    icon={Rss}
                    className="mb-2 border-none pb-0"
                />

                {/* Custom Dropdown */}
                <div className="relative">
                    <Button
                        variant="outline"
                        className="w-full justify-between items-center text-xs font-black uppercase tracking-wider bg-transparent border-input hover:bg-accent hover:text-accent-foreground transition-all"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span>{selectedGame}</span>
                        <ChevronDown className={cn("w-3 h-3 opacity-50 transition-transform", isDropdownOpen && "rotate-180")} />
                    </Button>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 w-full mt-1 bg-popover border border-border rounded-md shadow-lg z-50 py-1 max-h-60 overflow-y-auto">
                            {displayCategories.map((game) => {
                                const gameSlug = getSlugFromCategory(game);
                                const href = game === "Tous les jeux" ? "/news" : `/news/${gameSlug}`;
                                return (
                                    <Link
                                        key={game}
                                        href={href}
                                        className={cn(
                                            "block w-full text-left px-4 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors",
                                            selectedGame === game ? "text-primary bg-accent/50" : "text-popover-foreground hover:text-primary"
                                        )}
                                        onClick={() => {
                                            setSelectedGame(game);
                                            setIsDropdownOpen(false);
                                            setActivePage(1);
                                        }}
                                    >
                                        {game}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* News List */}
            <div className="flex flex-col gap-6">
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="animate-pulse flex flex-col gap-2">
                                <div className="h-3 w-20 bg-muted rounded"></div>
                                <div className="h-4 w-full bg-muted rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : newsItems.length > 0 ? (
                    newsItems.map((item) => (
                        <article key={item.id} className="group flex gap-4 items-start border-l-2 border-transparent hover:border-primary pl-2 transition-all -ml-2.5">
                            <div className="flex flex-col flex-1">
                                <Link href={`/news/${item.slug}`} className="block group/link">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-tight">
                                        <time dateTime={item.publishedAt} className="text-muted-foreground group-hover/link:text-primary transition-colors">
                                            {new Date(item.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </time>
                                        <span className="text-border">|</span>
                                        <span className="text-muted-foreground group-hover/link:text-primary transition-colors">
                                            {item.category?.name || "General"}
                                        </span>
                                        <span className="text-border">|</span>
                                        <div className="flex items-center gap-1 group-hover/link:text-primary transition-colors">
                                            <span>0</span>
                                            <MessageCircle className="w-2.5 h-2.5 fill-current" />
                                        </div>
                                    </div>

                                    <h3 className="text-[14px] font-black leading-tight text-foreground uppercase group-hover/link:text-primary transition-colors line-clamp-2">
                                        {item.title}
                                    </h3>
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="py-8 text-center text-sm text-muted-foreground italic">
                        Aucune actualité trouvée.
                    </div>
                )}
            </div>

            {/* Pagination & Footer */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePageChange(activePage - 1)}
                        disabled={activePage === 1 || loading}
                        className="h-8 w-8 text-muted-foreground hover:text-primary disabled:opacity-30 transition-colors"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="w-4 h-4 font-black" />
                    </Button>

                    <span className="text-xs font-black text-foreground tracking-widest min-w-[3ch] text-center">
                        {activePage} <span className="text-muted-foreground font-normal mx-1">/</span> {totalPages || 1}
                    </span>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePageChange(activePage + 1)}
                        disabled={activePage === totalPages || totalPages === 0 || loading}
                        className="h-8 w-8 text-muted-foreground hover:text-primary disabled:opacity-30 transition-colors"
                        aria-label="Next page"
                    >
                        <ChevronRight className="w-4 h-4 font-black" />
                    </Button>
                </div>

                <Link
                    href="/news"
                    className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group"
                >
                    Toute l'actu
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </Card>
    );
}
