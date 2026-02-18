export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchStrapi<T>(
    endpoint: string,
    query?: Record<string, any>,
    options: RequestInit = {}
): Promise<T> {
    const url = new URL(`${STRAPI_URL}/api/${endpoint}`);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined) {
                if (typeof value === 'object') {
                    // Simple nested object to query string (Strapi style)
                    // For more complex queries, qs library is better, but let's try to keep it simple first
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        url.searchParams.append(`${key}[${subKey}]`, String(subValue));
                    });
                } else {
                    url.searchParams.append(key, String(value));
                }
            }
        });
    }

    const res = await fetch(url.toString(), {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
            ...options.headers,
        },
        next: { revalidate: 60, ...options.next }, // Default revalidation
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    }

    return res.json();
}

export interface StrapiImage {
    url: string;
    alternativeText?: string;
}

export interface StrapiArticle {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    summary: string;
    content: any; // Blocks format
    publishedAt: string;
    coverImage?: {
        url: string;
    };
    category?: {
        name: string;
        slug: string;
    };
    game?: {
        name: string;
        slug: string;
    };
}

export async function getArticles(params: {
    locale: string;
    category?: string;
    limit?: number;
    start?: number;
}) {
    const query: any = {
        locale: params.locale,
        populate: ['coverImage', 'category', 'game'],
        sort: 'publishedAt:desc',
    };

    if (params.category) {
        query['filters[category][slug][$eq]'] = params.category;
    }

    if (params.limit) {
        query['pagination[limit]'] = params.limit;
    }

    if (params.start) {
        query['pagination[start]'] = params.start;
    }

    // Since our fetchStrapi is very simple with nested objects, let's just use raw strings for filters if needed
    // or just pass the query as is if it's flat enough.
    // Strapi actually supports flat query params too:
    // filters[category][slug]=valorant

    return fetchStrapi<{ data: StrapiArticle[]; meta: any }>('articles', query);
}

export async function getArticleBySlug(slug: string, locale: string) {
    const query = {
        'filters[slug][$eq]': slug,
        locale: locale,
        populate: ['coverImage', 'category', 'game', 'author'],
    };

    const res = await fetchStrapi<{ data: StrapiArticle[] }>('articles', query);
    return res.data[0] || null;
}

export async function getCategories(locale: string) {
    return fetchStrapi<{ data: any[] }>('categories', { locale });
}

export async function getMatches(locale: string = 'fr', limit?: number) {
    const query: any = {
        locale,
        populate: ['game'],
        sort: 'date:desc',
    };

    if (limit) {
        query['pagination[limit]'] = limit;
    }

    return fetchStrapi<{ data: any[] }>('matches', query);
}
