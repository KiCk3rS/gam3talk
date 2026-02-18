import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { getArticles, STRAPI_URL } from "@/lib/strapi";
import { cn } from "@/lib/utils";
import { getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function NewsBentoGrid() {
    const locale = await getLocale() as 'en' | 'fr' | 'es';

    let articles: any[] = [];
    try {
        const response = await getArticles({ locale, limit: 4 });
        articles = response.data;
    } catch (error) {
        console.error("Failed to fetch articles:", error);
    }

    const mainNews = articles[0];
    const rightTopNews = articles[1];
    const rightBottomNews1 = articles[2];
    const rightBottomNews2 = articles[3];

    const NewsItem = ({ news, className, titleSize = "text-xl" }: { news: any, className?: string, titleSize?: string }) => {
        if (!news) return <div className={cn("bg-muted animate-pulse", className)} />;

        const imageUrl = news.coverImage?.url
            ? (news.coverImage.url.startsWith('http') ? news.coverImage.url : `${STRAPI_URL}${news.coverImage.url}`)
            : "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop";

        return (
            <Link href={`/news/${news.slug}`} className={cn("block relative overflow-hidden group cursor-pointer h-full", className)}>
                <Card className="relative h-full w-full border-none shadow-none rounded-none overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

                    {/* News Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={imageUrl}
                            alt={news.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>

                    <CardContent className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end h-full">
                        <div className="flex justify-between items-center mb-2">
                            <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm">
                                {news.category?.name || "General"}
                            </Badge>
                            <span className="text-xs text-gray-300 font-mono">
                                {new Date(news.publishedAt).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                        </div>
                        <h3 className={cn("font-bold text-white leading-tight", titleSize)}>
                            {news.title}
                        </h3>
                    </CardContent>
                </Card>
            </Link>
        );
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-4 grid-rows-2 h-[800px] gap-0.5 bg-black">
                {/* Left Main Item */}
                <NewsItem
                    news={mainNews}
                    className="lg:col-span-2 lg:row-span-2"
                    titleSize="text-3xl lg:text-5xl mb-2"
                />

                {/* Right Column */}
                {/* Top Right */}
                <NewsItem
                    news={rightTopNews}
                    className="lg:col-span-2 lg:row-span-1"
                    titleSize="text-2xl"
                />

                {/* Bottom Right 1 */}
                <NewsItem
                    news={rightBottomNews1}
                    className="lg:col-span-1 lg:row-span-1"
                />

                {/* Bottom Right 2 */}
                <NewsItem
                    news={rightBottomNews2}
                    className="lg:col-span-1 lg:row-span-1"
                />
            </div>
        </div>
    );
}
