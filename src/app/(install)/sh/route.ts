import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('http://103.127.96.116:9000/install.sh');
        const data = await response.text();
        return new NextResponse(data, { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch data' }), { status: 500 });
    }
}