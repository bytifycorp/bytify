'use server'

import { revalidateTag, revalidatePath } from 'next/cache'

export async function GET() {
    revalidateTag('posts')

    revalidateTag('all')
    console.log('revalidate')

    revalidatePath('/')

    return new Response(null, {
        status: 200,
    })
}