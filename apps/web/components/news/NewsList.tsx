import Image from "next/image";
import { Link } from '@/i18n/routing';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { getLocale } from 'next-intl/server';
import { getArticles, STRAPI_URL } from "@/lib/strapi";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 7;

interface NewsListProps {
    category?: string;
    page?: number;
}

export async function NewsList({ category, page = 1 }: NewsListProps) {
    const locale = await getLocale() as 'en' | 'fr' | 'es';

    let articles: any[] = [];
    let totalPages = 1;
    let totalItems = 0;

    try {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const response = await getArticles({
            locale,
            category,
            limit: ITEMS_PER_PAGE,
            start
        });
        articles = response.data;
        totalItems = response.meta?.pagination?.total || 0;
        totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    } catch (error) {
        console.error("Failed to fetch news list:", error);
    }

    if (articles.length === 0) {
        return (
            <div className="text-center py-20 bg-card rounded-xl border border-border/50">
                <p className="text-muted-foreground font-bold uppercase tracking-widest">
                    Aucun article trouvé
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-6">
                {articles.map((news) => {
                    const imageUrl = news.coverImage?.url
                        ? (news.coverImage.url.startsWith('http') ? news.coverImage.url : `${STRAPI_URL}${news.coverImage.url}`)
                        : "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop";

                    return (
                        <Link href={`/news/${news.slug}`} key={news.id} className="group bg-card border border-border/50 hover:border-primary/50 rounded-xl overflow-hidden transition-all hover:shadow-lg flex flex-col md:flex-row h-full md:h-52">
                            {/* Image */}
                            <div className="relative w-full md:w-1/3 h-48 md:h-full shrink-0 overflow-hidden">
                                <Image
                                    src={imageUrl}
                                    alt={news.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge className="bg-primary/90 text-primary-foreground font-bold uppercase tracking-wider text-[10px] border-none">
                                        {news.category?.name || "General"}
                                    </Badge>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-between p-5 md:p-6 w-full">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-wider">
                                        <Clock className="w-3.5 h-3.5" />
                                        {new Date(news.publishedAt).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black uppercase leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                        {news.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-2 font-medium">
                                        {news.summary}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                    Lire l'article
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                    <Link
                        href={{
                            pathname: '/news',
                            query: {
                                ...(category ? { category } : {}),
                                page: page - 1
                            }
                        }}
                        className={cn(
                            "inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-border/50 hover:border-primary hover:text-primary transition-colors",
                            page <= 1 && "pointer-events-none opacity-30"
                        )}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>

                    <span className="text-sm font-black uppercase tracking-wider text-muted-foreground">
                        Page <span className="text-foreground">{page}</span> / {totalPages}
                    </span>

                    <Link
                        href={{
                            pathname: '/news',
                            query: {
                                ...(category ? { category } : {}),
                                page: page + 1
                            }
                        }}
                        className={cn(
                            "inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-border/50 hover:border-primary hover:text-primary transition-colors",
                            page >= totalPages && "pointer-events-none opacity-30"
                        )}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                </div>
            )}
        </div>
    );
}
