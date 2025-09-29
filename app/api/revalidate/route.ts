import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const { tag, secret } = await req.json();
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (tag) revalidateTag(tag);
  return NextResponse.json({ ok: true });
}
