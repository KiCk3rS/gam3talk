import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsHero } from "@/components/news/NewsHero";
import { NewsList } from "@/components/news/NewsList";
import { LastNewsSidebar } from "@/components/home/LastNewsSidebar";


interface NewsPageProps {
    searchParams: Promise<{
        category?: string;
        page?: string;
    }>;
}

export default async function NewsPage(props: NewsPageProps) {
    const searchParams = await props.searchParams;
    const category = searchParams.category;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
            <Navbar />

            <main className="flex-1 flex flex-col">
                <NewsHero category={category} />

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content: News List (8 cols) */}
                        <div className="lg:col-span-8">
                            <NewsList category={category} page={page} />
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
