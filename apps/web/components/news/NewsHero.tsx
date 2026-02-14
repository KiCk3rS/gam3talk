"use client";

import { useTranslations } from 'next-intl';

interface NewsHeroProps {
    category?: string;
}

export function NewsHero({ category }: NewsHeroProps) {
    const t = useTranslations('NewsPage');

    const title = category ? category : "GAMING NEWS";
    const breadcrumb = category ? `Home > Gaming News > ${category}` : "Home > Gaming News";

    return (
        <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-cyan-500/90 mix-blend-multiply z-10" />
                {/* Placeholder background - ideally dynamic based on category or a generic gaming one */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 grayscale"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop')" }}
                />
            </div>

            {/* Content */}
            <div className="container mx-auto relative z-20 text-center text-white">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 drop-shadow-lg">
                    {title}
                </h1>
                <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest opacity-80">
                    {breadcrumb}
                </div>
            </div>
        </section>
    );
}
