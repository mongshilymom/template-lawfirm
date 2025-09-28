import { NextResponse } from "next/server";
export async function POST() {
  // 실제 운영은 DB/메일 붙이지만, 키 부재 시에도 성공 응답(데모판매용)
  return NextResponse.json({ ok:true });
}
