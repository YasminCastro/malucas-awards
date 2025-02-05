import { getCategoriesCollection } from "@/lib/collections/categories";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const categoriesCollection = await getCategoriesCollection();

    const result = await categoriesCollection.find().toArray();

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
