import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
