import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MatchCarousel } from "@/components/home/MatchCarousel";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommentSection } from "@/components/article/CommentSection";
import { ArticleShareButtons } from "@/components/article/ArticleShareButtons";
import { Breadcrumb } from "@/components/ui/breadcrumb-custom";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import type { Metadata, ResolvingMetadata } from "next";
import { getCategoryFromSlug } from "@/lib/slugUtils";
import { NewsHero } from "@/components/news/NewsHero";
import { NewsList } from "@/components/news/NewsList";
import { LastNewsSidebar } from "@/components/home/LastNewsSidebar";
import { getArticleBySlug, STRAPI_URL } from "@/lib/strapi";
import { BlocksRenderer } from "@/components/article/BlocksRenderer";

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { locale, slug } = await params;

    // Check if it's a category
    const category = getCategoryFromSlug(slug);
    if (category) {
        return {
            title: `${category} News | Gam3Talk`,
            description: `Latest news and updates for ${category}`,
        };
    }

    const article = await getArticleBySlug(slug, locale);

    if (!article) {
        return {
            title: 'Not Found | Gam3Talk',
        };
    }

    const title = article.title;
    const description = article.summary;
    const previousImages = (await parent).openGraph?.images || [];
    const imageUrl = article.coverImage?.url
        ? (article.coverImage.url.startsWith('http') ? article.coverImage.url : `${STRAPI_URL}${article.coverImage.url}`)
        : "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop";

    return {
        title: `${title} | Gam3Talk`,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: `https://gam3talk.com/${locale}/news/${slug}`,
            siteName: 'Gam3Talk',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
                ...previousImages,
            ],
            locale: locale,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [imageUrl],
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { locale, slug } = await params;

    // 1. Check if slug is a Category
    const category = getCategoryFromSlug(slug);

    if (category) {
        return (
            <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
                <Navbar />

                <main className="flex-1 flex flex-col">
                    <NewsHero category={category} />

                    <div className="container mx-auto px-4 py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Main Content: News List (8 cols) */}
                            <div className="lg:col-span-8">
                                <NewsList category={category} />
                            </div>

                            {/* Sidebar: Reusing LastNewsSidebar (4 cols) */}
                            <div className="lg:col-span-4 sticky top-24 h-fit">
                                <LastNewsSidebar />
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    // 2. Check if slug is an Article
    const article = await getArticleBySlug(slug, locale);

    if (!article) {
        notFound();
    }

    const imageUrl = article.coverImage?.url
        ? (article.coverImage.url.startsWith('http') ? article.coverImage.url : `${STRAPI_URL}${article.coverImage.url}`)
        : "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop";

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        image: [imageUrl],
        datePublished: article.publishedAt,
        author: [{
            '@type': 'Person',
            name: (article as any).author?.name || 'Gam3Talk Team',
        }],
        description: article.summary
    };

    const articleUrl = `https://gam3talk.com/${locale}/news/${slug}`;

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            {/* Match Carousel below navbar as requested */}
            <MatchCarousel />

            <main className="flex-1 container mx-auto px-4 py-8">
                <article className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <Breadcrumb
                            items={[
                                { label: "News", href: `/${locale}/news` },
                                { label: article.category?.name || "General", href: `/${locale}/news/${article.category?.slug || 'general'}` },
                                { label: article.title, active: true }
                            ]}
                        />
                    </div>

                    {/* Header */}
                    <div className="mb-8 space-y-4">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                                {article.category?.name || "General"}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(article.publishedAt).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight">
                            {article.title}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                            {article.summary}
                        </p>
                    </div>

                    <figure className="mb-10 space-y-4">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src={imageUrl}
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <figcaption className="text-center text-sm text-muted-foreground font-medium italic">
                            {article.title} — © Gam3Talk
                        </figcaption>
                    </figure>

                    {/* Content */}
                    <div className="prose dark:prose-invert prose-lg max-w-none text-foreground/90">
                        <BlocksRenderer content={article.content} />
                    </div>


                    {/* Actions / Footer of Article */}
                    <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-wrap gap-4">
                            <Button variant="outline" size="sm" className="gap-2 rounded-full border-primary/20 hover:border-primary/50 transition-colors">
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>

                            <ArticleShareButtons
                                title={article.title}
                                url={articleUrl}
                            />
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Enjoyed this?</span>
                            <Button variant="link" className="text-primary font-bold uppercase tracking-tighter p-0">
                                Subscribe to Gam3Talk
                            </Button>
                        </div>
                    </div>

                    {/* Related Articles Section */}
                    <div className="mt-12">
                        <RelatedArticles
                            currentSlug={slug}
                            category={article.category?.name || "General"}
                            locale={locale as 'en' | 'fr' | 'es'}
                        />
                    </div>

                    {/* Comment Section */}
                    <CommentSection />
                </article>

            </main>

            <Footer />
        </div>
    );
}
