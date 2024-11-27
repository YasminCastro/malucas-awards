import { getCategoriesCollection } from "@/lib/collections/categories";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";

interface IDeleteCategory {
  title: string;
}

export async function DELETE(req: Request) {
  try {
    const { title }: IDeleteCategory = await req.json();

    if (!title) throw new Error("Instagram handle is missing");

    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const usersCollection = await getCategoriesCollection();

    const result = await usersCollection.findOneAndDelete({ title });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
