import { NextRequest, NextResponse } from 'next/server';
import { getArticles } from '@/lib/strapi';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'fr';
    const category = searchParams.get('category') || undefined;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const start = searchParams.get('start') ? parseInt(searchParams.get('start')!) : 0;

    try {
        const response = await getArticles({ locale, category, limit, start });
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
