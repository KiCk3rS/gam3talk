
export function getCategoryFromSlug(slug: string): string | undefined {
    const slugMap: Record<string, string> = {
        "league-of-legends": "League of Legends",
        "valorant": "Valorant",
        "cs2": "CS2",
        "dota-2": "Dota 2",
        "rocket-league": "Rocket League",
        "rainbow-six": "Rainbow Six",
        "overwatch-2": "Overwatch 2",
        "fighting-games": "Fighting Games",
        "apex-legends": "Apex Legends"
    };

    return slugMap[slug.toLowerCase()];
}

export function getSlugFromCategory(category: string): string {
    return category.toLowerCase().replace(/\s+/g, '-');
}
