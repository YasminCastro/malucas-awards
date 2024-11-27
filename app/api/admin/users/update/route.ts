import { getUsersCollection } from "@/lib/collections/users";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";

interface IUpdateGuest {
  ig: string;
  name?: string;
  imagePath?: string;
}

export async function PUT(req: Request) {
  try {
    const { name, ig, imagePath }: IUpdateGuest = await req.json();

    if (!ig) throw new Error("Instagram handle is missing");

    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const updateFields: Partial<IUpdateGuest> = {};
    if (name !== undefined) updateFields.name = name;
    if (imagePath !== undefined) updateFields.imagePath = imagePath;

    const usersCollection = await getUsersCollection();

    const result = await usersCollection.findOneAndUpdate(
      { ig },
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
