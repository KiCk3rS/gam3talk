import { NextRequest, NextResponse } from 'next/server';
import { getMatches } from '@/lib/strapi';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'fr';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

    try {
        const response = await getMatches(locale, limit);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
