import { PostImage } from '@/app/opengraph-image'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const title = searchParams.get('title') ?? 'My Blog Post'
    const author = searchParams.get('author') ?? 'Anonymous'
    const date = searchParams.get('date') ?? 'No date'

    return PostImage(title, author, date)
}