import { getCategoriesCollection } from "@/lib/collections/categories";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";

interface IUpdateCategorie {
  title: string;
  winner?: string;
  nominees?: string[];
}

export async function PUT(req: Request) {
  try {
    const { winner, title, nominees }: IUpdateCategorie = await req.json();

    if (!title) throw new Error("Instagram handle is missing");

    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const updateFields: Partial<IUpdateCategorie> = {};
    if (winner !== undefined) updateFields.winner = winner;
    if (nominees !== undefined) updateFields.nominees = nominees;

    const categoriesCollection = await getCategoriesCollection();

    const result = await categoriesCollection.findOneAndUpdate(
      { title },
      { $set: updateFields },
      { returnDocument: "after" }
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "IG handle already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
