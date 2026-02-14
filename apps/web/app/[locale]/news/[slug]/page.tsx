import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MatchCarousel } from "@/components/home/MatchCarousel";
import { mockNews } from "@/lib/mockData";
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
    const currentLocale = locale as 'en' | 'fr' | 'es';

    // Check if it's a category
    const category = getCategoryFromSlug(slug);
    if (category) {
        return {
            title: `${category} News | Gam3Talk`,
            description: `Latest news and updates for ${category}`,
        };
    }

    const article = mockNews.find((n) => n.slug[currentLocale] === slug);

    if (!article) {
        return {
            title: 'Not Found | Gam3Talk',
        };
    }

    const title = article.title[currentLocale];
    const description = article.summary[currentLocale];
    const previousImages = (await parent).openGraph?.images || [];

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
                    url: article.image,
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
            images: [article.image],
        },
    };
}

export default async function Page({ params }: PageProps) {
    const { locale, slug } = await params;
    const currentLocale = locale as 'en' | 'fr' | 'es';

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
    const article = mockNews.find((n) => n.slug[currentLocale] === slug);

    if (!article) {
        notFound();
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title[currentLocale],
        image: [article.image],
        datePublished: new Date().toISOString(),
        author: [{
            '@type': 'Organization',
            name: 'Gam3Talk Team',
            url: 'https://gam3talk.com'
        }],
        description: article.summary[currentLocale]
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
                                { label: article.category, href: `/${locale}/news/${getCategoryFromSlug(slug) ? slug : article.category.toLowerCase().replace(/\s+/g, '-')}` },
                                // Note: href above attempts to link to category page. Ideally we use a helper. 
                                // Since we are in the article, we don't strictly know the slugified category unless we compute it.
                                // But let's leave it simple for now or use reference.
                                { label: article.title[currentLocale], active: true }
                            ]}
                        />
                    </div>

                    {/* Header */}
                    <div className="mb-8 space-y-4">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                                {article.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {article.date}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight">
                            {article.title[currentLocale]}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                            {article.summary[currentLocale]}
                        </p>
                    </div>

                    <figure className="mb-10 space-y-4">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src={article.image}
                                alt={article.title[currentLocale]}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <figcaption className="text-center text-sm text-muted-foreground font-medium italic italic">
                            {article.title[currentLocale]} — © Gam3Talk
                        </figcaption>
                    </figure>

                    {/* Content */}
                    <div className="prose dark:prose-invert prose-lg max-w-none text-foreground/90">
                        <p className="whitespace-pre-line leading-relaxed">
                            {article.content[currentLocale]}
                        </p>

                        <div className="mt-8 space-y-6 text-muted-foreground">
                            <p>
                                LDrum ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                            </p>
                        </div>
                    </div>


                    {/* Actions / Footer of Article */}
                    <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-wrap gap-4">
                            <Button variant="outline" size="sm" className="gap-2 rounded-full border-primary/20 hover:border-primary/50 transition-colors">
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>

                            <ArticleShareButtons
                                title={article.title[currentLocale]}
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
                            category={article.category}
                            locale={currentLocale}
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
