import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
                    alt="Esports Arena"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center md:text-left">
                <div className="max-w-3xl">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full backdrop-blur-sm border border-primary/20">
                        Featured
                    </span>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl text-white mb-6 drop-shadow-lg">
                        The Future of Esports Coverage is Here
                    </h1>
                    <p className="text-xl text-zinc-200 mb-8 max-w-2xl drop-shadow-md">
                        Join the ultimate community for gamers. Get the latest news, live scores, and exclusive content from your favorite tournaments.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Button size="lg" className="text-lg px-8">
                            Read Latest News
                        </Button>
                        <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                            View Match Schedule
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
