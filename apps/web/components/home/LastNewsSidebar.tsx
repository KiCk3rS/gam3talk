"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Rss } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock Data
const GAMES = [
    "Tous les jeux",
    "League of Legends",
    "Valorant",
    "CS2",
    "Dota 2",
    "Rocket League",
    "Rainbow Six",
    "Overwatch 2",
];

const NEWS_ITEMS = [
    {
        id: 1,
        time: "14:51",
        game: "League of Legends",
        title: "LCK Cup 2026 : Gen.G domine Dplus KIA et rejoint la finale",
        comments: 0,
        url: "#",
    },
    {
        id: 2,
        time: "13:06",
        game: "League of Legends",
        title: "Mireu suspendu et lourdement sanctionné par Vivo Keyd Stars",
        comments: 12,
        url: "#",// Example of highlighting specific news if needed
    },
    {
        id: 3,
        time: "12:20",
        game: "League of Legends",
        title: "Rhilech : « Pour les autres joueurs, je ne pense pas que ce soit grave... »",
        comments: 5,
        url: "#",
    },
    {
        id: 4,
        time: "11:28",
        game: "Rainbow Six",
        title: "Mowwwgli : « J'ai envie de gagner devant mon public »",
        comments: 2,
        url: "#",
    },
    {
        id: 5,
        time: "10:42",
        game: "League of Legends",
        title: "LFL Invitational 2026 : Solary intouchable, le réveil tardif de la KC",
        comments: 8,
        url: "#",
    },
    {
        id: 6,
        time: "09:22",
        game: "League of Legends",
        title: "LCK Cup 2026 : arbre et programme des playoffs",
        comments: 0,
        url: "#",
    },
    {
        id: 7,
        time: "13/02",
        game: "League of Legends",
        title: "LFL Invitational 2026 : le programme du Super Group",
        comments: 1,
        url: "#",
    },
    {
        id: 8,
        time: "13/02",
        game: "League of Legends",
        title: "LCK Cup 2026 : Dplus KIA s'impose au bout du suspense",
        comments: 4,
        url: "#",
    },
    {
        id: 9,
        time: "13/02",
        game: "League of Legends",
        title: "PBE LoL 26.04 : la preview des futurs équilibrages... ajustements",
        comments: 0,
        url: "#",
    },
    {
        id: 10,
        time: "13/02",
        game: "Rainbow Six",
        title: "bbySharKK : « On n'a pas montré le Wildcard qui a battu... »",
        comments: 0,
        url: "#",
    },
    {
        id: 11,
        time: "12/02",
        game: "Valorant",
        title: "VCT EMEA 2026 : Fnatic confirme sa domination",
        comments: 15,
        url: "#",
    },
    {
        id: 12,
        time: "12/02",
        game: "CS2",
        title: "Major Copenhague : Vitality valide son ticket pour les playoffs",
        comments: 23,
        url: "#",
    },
];

const ITEMS_PER_PAGE = 8;

export function LastNewsSidebar() {
    const [activePage, setActivePage] = useState(1);
    const [selectedGame, setSelectedGame] = useState("Tous les jeux");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Filter news
    const filteredNews =
        selectedGame === "Tous les jeux"
            ? NEWS_ITEMS
            : NEWS_ITEMS.filter((item) => item.game === selectedGame);

    // Pagination logic
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    const currentNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setActivePage(newPage);
        }
    };

    const handleGameSelect = (game: string) => {
        setSelectedGame(game);
        setActivePage(1); // Reset to first page on filter change
        setIsDropdownOpen(false);
    };

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
                        <div className="absolute top-full left-0 w-full mt-1 bg-popover border border-border rounded-md shadow-lg z-50 py-1">
                            {GAMES.map((game) => (
                                <button
                                    key={game}
                                    className={cn(
                                        "w-full text-left px-4 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors",
                                        selectedGame === game ? "text-primary bg-accent/50" : "text-popover-foreground hover:text-primary"
                                    )}
                                    onClick={() => handleGameSelect(game)}
                                >
                                    {game}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* News List */}
            <div className="flex flex-col gap-6">
                {currentNews.length > 0 ? (
                    currentNews.map((item) => (
                        <article key={item.id} className="group flex gap-4 items-start border-l-2 border-transparent hover:border-primary pl-2 transition-all -ml-2.5">
                            {/* Time as a distinct visual element if desired, or keep inline but styled */}
                            <div className="flex flex-col flex-1">
                                <Link href={item.url} className="block group/link">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground mb-1.5 uppercase tracking-tight">
                                        <time dateTime={item.time} className="text-muted-foreground group-hover/link:text-primary transition-colors">{item.time}</time>
                                        <span className="text-border">|</span>
                                        <span className={cn(
                                            "text-muted-foreground group-hover/link:text-primary transition-colors",
                                        )}>
                                            {item.game}
                                        </span>
                                        <span className="text-border">|</span>
                                        <div className="flex items-center gap-1 group-hover/link:text-primary transition-colors">
                                            <span>{item.comments}</span>
                                            <MessageCircle className="w-2.5 h-2.5 fill-current" />
                                        </div>
                                    </div>

                                    <h3 className={cn(
                                        "text-[14px] font-black leading-tight text-foreground uppercase group-hover/link:text-primary transition-colors line-clamp-2",
                                        // item.highlight && "text-primary" 
                                    )}>
                                        {item.title}
                                    </h3>
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <div className="py-8 text-center text-sm text-muted-foreground italic">
                        Aucune actualité pour ce jeu.
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
                        disabled={activePage === 1}
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
                        disabled={activePage === totalPages || totalPages === 0}
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
