import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NewsBentoGrid } from "@/components/home/NewsBentoGrid";
import { MatchCarousel } from "@/components/home/MatchCarousel";
import { NewsAndMatches } from "@/components/home/NewsAndMatches";
import { GamesFilter } from "@/components/home/GamesFilter";
import { TwitchSection } from "@/components/home/TwitchSection";
import { InterviewsSection } from "@/components/home/InterviewsSection";
import { YoutubeSection } from "@/components/home/YoutubeSection";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <NewsBentoGrid />
        <MatchCarousel />
        <GamesFilter />
        <NewsAndMatches />
        <YoutubeSection />
        <InterviewsSection />
        <TwitchSection />
      </main>
      <Footer />
    </div>
  );
}
