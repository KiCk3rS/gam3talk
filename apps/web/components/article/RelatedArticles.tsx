import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getArticles, STRAPI_URL } from "@/lib/strapi";

interface RelatedArticlesProps {
    currentSlug: string;
    category: string;
    locale: 'en' | 'fr' | 'es';
}

export async function RelatedArticles({ currentSlug, category, locale }: RelatedArticlesProps) {
    let relatedArticles: any[] = [];

    try {
        const response = await getArticles({
            locale,
            category: category.toLowerCase().replace(/\s+/g, '-'),
            limit: 4
        });
        // Filter out current article and take top 3
        relatedArticles = response.data
            .filter((article: any) => article.slug !== currentSlug)
            .slice(0, 3);
    } catch (error) {
        console.error("Failed to fetch related articles:", error);
    }

    if (relatedArticles.length === 0) return null;

    return (
        <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-2">
                <span className="bg-primary w-2 h-8 rounded-full"></span>
                Related News
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((article) => {
                    const imageUrl = article.coverImage?.url
                        ? (article.coverImage.url.startsWith('http') ? article.coverImage.url : `${STRAPI_URL}${article.coverImage.url}`)
                        : "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop";

                    return (
                        <Link
                            key={article.id}
                            href={`/news/${article.slug}`}
                            className="group flex flex-col gap-4"
                        >
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border/50 group-hover:border-primary/50 transition-colors">
                                <Image
                                    src={imageUrl}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-2 left-2">
                                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs font-bold">
                                        {article.category?.name || "General"}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    <span>{new Date(article.publishedAt).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h3>
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className="mt-8 flex justify-center">
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-primary font-bold uppercase text-sm hover:underline hover:text-primary/80 transition-all"
                >
                    View more news <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}
