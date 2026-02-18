import { NextRequest, NextResponse } from 'next/server';
import { getCategories } from '@/lib/strapi';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const locale = searchParams.get('locale') || 'fr';

    try {
        const response = await getCategories(locale);
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
