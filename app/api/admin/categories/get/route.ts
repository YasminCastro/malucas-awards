import { NextResponse } from "next/server";

import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "categories.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const categories = JSON.parse(fileContents);

    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
