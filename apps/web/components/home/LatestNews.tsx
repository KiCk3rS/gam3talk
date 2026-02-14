import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const newsItems = [
    {
        id: 1,
        title: "T1 Wins Worlds 2025: A Dynasty Reborn",
        excerpt: "Faker and T1 secure another championship title in a grueling 5-game series against BLG.",
        category: "League of Legends",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop",
        date: "2 hours ago",
    },
    {
        id: 2,
        title: "CS2 Major Copenhagen: Vitality on Top",
        excerpt: "ZywOo leads Vitality to victory in the first ever CS2 Major.",
        category: "CS2",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
        date: "5 hours ago",
    },
    {
        id: 3,
        title: "Valorant Champions 2025: Group Stage Analysis",
        excerpt: "Breaking down the biggest upsets and standout performances from the group stage.",
        category: "Valorant",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2765&auto=format&fit=crop",
        date: "1 day ago",
    },
];

export function LatestNews() {
    return (
        <section className="py-12 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Latest News</h2>
                    <Link href="/news" className="text-primary hover:underline font-medium">
                        View All News
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow group">
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-2 left-2">
                                    <Badge variant="secondary" className="bg-black/70 text-white hover:bg-black/80 backdrop-blur-sm">
                                        {item.category}
                                    </Badge>
                                </div>
                            </div>
                            <CardHeader className="p-4 pb-2">
                                <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                    <Link href={`/news/${item.id}`}>
                                        {item.title}
                                    </Link>
                                </h3>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-muted-foreground line-clamp-2 text-sm">
                                    {item.excerpt}
                                </p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex items-center text-xs text-muted-foreground">
                                <Calendar className="mr-1 h-3 w-3" />
                                {item.date}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
