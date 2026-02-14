export const mockNews = [
    {
        id: "1",
        title: "T1 Wins Worlds 2025: A Historic Victory",
        category: "League of Legends",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
        date: "2025-11-04",
        summary: "Faker lifts the trophy for the 5th time...",
        isMain: true,
    },
    {
        id: "2",
        title: "CS2 Major: Vitality's Road to Finals",
        category: "CS2",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop",
        date: "2025-11-03",
        summary: "ZywOo dominates the semi-finals against...",
        isMain: false,
    },
    {
        id: "3",
        title: "Valorant Champions 2026 Announced",
        category: "Valorant",
        image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=2670&auto=format&fit=crop",
        date: "2025-11-02",
        summary: "Riot Games reveals the next location for...",
        isMain: false,
    },
    {
        id: "4",
        title: "Dota 2 Patch 7.38: What Changed?",
        category: "Dota 2",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
        date: "2025-11-01",
        summary: "Significant map changes and hero balances...",
        isMain: false,
    },
    {
        id: "5",
        title: "Overwatch 2: New Hero Revealed",
        category: "Overwatch 2",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
        date: "2025-10-31",
        summary: "Blizzard announces the latest addition to the roster...",
        isMain: false,
    },
    {
        id: "6",
        title: "Rocket League Championship Series Update",
        category: "Rocket League",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
        date: "2025-10-30",
        summary: "New format announced for the upcoming season...",
        isMain: false,
    },
    {
        id: "7",
        title: "Apex Legends Season 23 leaks",
        category: "Apex Legends",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
        date: "2025-10-29",
        summary: "Data miners find interesting files regarding the new map...",
        isMain: false,
    },
    {
        id: "8",
        title: "Street Fighter 6 Balance Patch Notes",
        category: "Fighting Games",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
        date: "2025-10-28",
        summary: "Capcom addresses the dominance of top tier characters...",
        isMain: false,
    },
];

export interface Team {
    name: string;
    logo?: string;
}

export interface Match {
    id: string;
    game: string;
    team1: Team;
    team2: Team;
    time?: string;
    score?: string;
    status: 'live' | 'upcoming' | 'finished';
}

export const mockMatches: Match[] = [
    {
        id: "1",
        game: "League of Legends",
        team1: { name: "T1" },
        team2: { name: "Gen.G" },
        time: "LIVE",
        score: "2 - 1",
        status: "live",
    },
    {
        id: "2",
        game: "CS2",
        team1: { name: "Navi" },
        team2: { name: "FaZe" },
        time: "20:00",
        status: "upcoming",
    },
    {
        id: "3",
        game: "Valorant",
        team1: { name: "Fnatic" },
        team2: { name: "LOUD" },
        time: "Tomorrow",
        status: "upcoming",
    },
    {
        id: "4",
        game: "Dota 2",
        team1: { name: "Liquid" },
        team2: { name: "Gaimin" },
        time: "Yesterday",
        score: "0 - 2",
        status: "finished",
    },
    {
        id: "5",
        game: "League of Legends",
        team1: { name: "G2" },
        team2: { name: "FNC" },
        time: "LIVE",
        score: "1 - 0",
        status: "live",
    },
    {
        id: "6",
        game: "Rocket League",
        team1: { name: "Vitality" },
        team2: { name: "BDS" },
        time: "18:00",
        status: "upcoming",
    },
    {
        id: "7",
        game: "CS2",
        team1: { name: "G2" },
        team2: { name: "Navi" },
        time: "21:00",
        status: "upcoming",
    },
    {
        id: "8",
        game: "League of Legends",
        team1: { name: "DK" },
        team2: { name: "KT" },
        time: "Tomorrow",
        status: "upcoming",
    },
    {
        id: "9",
        game: "Valorant",
        team1: { name: "SEN" },
        team2: { name: "100T" },
        time: "Feb 15",
        status: "upcoming",
    },
    {
        id: "10",
        game: "Dota 2",
        team1: { name: "Spirit" },
        team2: { name: "BB" },
        score: "1 - 1",
        status: "live",
    },
];

export const mockInterviews = [
    {
        id: "1",
        title: "\"We are the underdogs, and we are winning:\" NAVI Rhilech on his journey",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop",
        date: "February 11, 2026",
        author: "Cecilia Ciocchetti",
        link: "#",
    },
    {
        id: "2",
        title: "\"We've been struggling a bit\": G2 Caps on the team's slow start",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop",
        date: "February 2, 2026",
        author: "Cecilia Ciocchetti",
        link: "#",
    },
    {
        id: "3",
        title: "\"These drafts are just boring to play\": Team Vitality's Naak Nako",
        image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2765&auto=format&fit=crop",
        date: "January 30, 2026",
        author: "Cecilia Ciocchetti",
        link: "#",
    },
    {
        id: "4",
        title: "\"There is a lot of potential\": Karmine Corp SUYGETSU on the new roster",
        image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2670&auto=format&fit=crop",
        date: "January 30, 2026",
        author: "Lea Maas",
        link: "#",
    },
    {
        id: "5",
        title: "\"My Experience With the Game Hasn't Been the Best\": Interview with Pro",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2670&auto=format&fit=crop",
        date: "January 29, 2026",
        author: "Joey Morris",
        link: "#",
    },
    {
        id: "6",
        title: "\"Best-of-ones don't satisfy me\": Los Ratones' Rekkles on LEC format",
        image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2670&auto=format&fit=crop",
        date: "January 28, 2026",
        author: "Cecilia Ciocchetti",
        link: "#",
    },
    {
        id: "7",
        title: "\"We still need to try and find our identity as a team\": Team Heretics",
        image: "https://images.unsplash.com/photo-1518655048521-f130df041f66?q=80&w=2670&auto=format&fit=crop",
        date: "January 28, 2026",
        author: "Lea Maas",
        link: "#",
    },
    {
        id: "8",
        title: "\"2-4, it's manageable\" SK Gaming's Wunder discusses LEC Winter Split",
        image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2670&auto=format&fit=crop",
        date: "January 27, 2026",
        author: "Cecilia Ciocchetti",
        link: "#",
    },
];
