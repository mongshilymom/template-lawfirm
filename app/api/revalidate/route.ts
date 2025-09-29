import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tag, secret } = body

    // Check secret
    const previewSecret = process.env.SANITY_PREVIEW_SECRET
    if (secret !== previewSecret) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      )
    }

    if (!tag) {
      return NextResponse.json(
        { message: 'Missing tag parameter' },
        { status: 400 }
      )
    }

    // Revalidate the specified tag
    revalidateTag(tag)

    return NextResponse.json(
      {
        revalidated: true,
        tag,
        now: Date.now()
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    )
  }
}