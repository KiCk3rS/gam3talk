import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { mockNews } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

export function NewsBentoGrid() {
    const locale = useLocale() as 'en' | 'fr' | 'es';
    const mainNews = mockNews.find((n) => n.isMain) || mockNews[0];
    const rightTopNews = mockNews[1];
    const rightBottomNews1 = mockNews[2];
    const rightBottomNews2 = mockNews[3];

    const NewsItem = ({ news, className, titleSize = "text-xl" }: { news: typeof mainNews, className?: string, titleSize?: string }) => (
        <Link href={`/news/${news.slug[locale]}`} className={cn("block relative overflow-hidden group cursor-pointer h-full", className)}>
            <Card className="relative h-full w-full border-none shadow-none rounded-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />

                {/* News Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={news.image}
                        alt={news.title[locale]}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                <CardContent className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end h-full">
                    <div className="flex justify-between items-center mb-2">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm">
                            {news.category}
                        </Badge>
                        <span className="text-xs text-gray-300 font-mono">{news.date}</span>
                    </div>
                    <h3 className={cn("font-bold text-white leading-tight", titleSize)}>
                        {news.title[locale]}
                    </h3>
                </CardContent>
            </Card>
        </Link>
    );

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
