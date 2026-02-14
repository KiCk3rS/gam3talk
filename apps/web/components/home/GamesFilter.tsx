import { Gamepad2, Swords, Crosshair, Trophy } from "lucide-react";

const games = [
    { id: "cs2", name: "Counter Strike 2", icon: Crosshair },
    { id: "lol", name: "League of Legends", icon: Swords },
    { id: "dota2", name: "Dota 2", icon: Swords },
    { id: "valorant", name: "Valorant", icon: Crosshair },
    { id: "r6", name: "Rainbow Six Siege", icon: Crosshair },
    { id: "cod", name: "Call of Duty", icon: Crosshair },
    { id: "rl", name: "Rocket League", icon: Trophy },
    { id: "fgc", name: "Fighting Game Community", icon: Gamepad2 },
];

export function GamesFilter() {
    return (
        <section className="py-6 bg-background border-b border-border/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                        <Gamepad2 className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                        Browse by Game
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {games.map((game) => {
                        const Icon = game.icon;
                        return (
                            <button
                                key={game.id}
                                className="w-full h-28 px-3 py-4 rounded-xl bg-card border border-border/60 hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm hover:shadow-primary/5 transition-all duration-300 group/btn relative overflow-hidden flex flex-col items-center justify-center gap-3 cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 translate-y-[-100%] group-hover/btn:translate-y-[100%] transition-transform duration-700" />
                                <div className="p-2 rounded-full bg-primary/10 group-hover/btn:bg-primary/20 transition-colors relative z-10">
                                    <Icon className="w-6 h-6 text-primary/80 group-hover/btn:text-primary transition-colors" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground group-hover/btn:text-primary transition-colors text-center leading-tight relative z-10">
                                    {game.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
