import { NextResponse } from 'next/server';
import { register } from '@/lib/metrics';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const metrics = await register.metrics();
        return new NextResponse(metrics, {
            headers: {
                'Content-Type': register.contentType,
            },
        });
    } catch (err) {
        console.error("Prometheus metrics collection failed:", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
