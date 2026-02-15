import { NextResponse } from 'next/server'
import { getSimulatedPQCMetrics } from '@/lib/pqc'

export async function GET() {
    const metrics = getSimulatedPQCMetrics()
    return NextResponse.json(metrics)
}
