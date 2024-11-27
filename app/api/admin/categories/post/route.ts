import {
  getCategoriesCollection,
  ICategories,
} from "@/lib/collections/categories";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, nominees }: ICategories = await req.json();

    if (!title) throw new Error("title is missing");

    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const categoriesCollection = await getCategoriesCollection();

    const result = await categoriesCollection.insertOne({
      title,
      nominees: nominees || [],
    });

    return NextResponse.json(
      { message: "Category created successfully", id: result.insertedId },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
