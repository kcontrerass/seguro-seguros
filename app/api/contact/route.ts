import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const res = await fetch(
            'https://segurosegurosbe.aumenta.do/wp-json/api/v1/contact',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();
        console.log(data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ success: false, data: { message: 'Internal Server Error' } }, { status: 500 });
    }
}
