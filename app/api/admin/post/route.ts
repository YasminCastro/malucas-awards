import { getUsersCollection } from "@/lib/collections/users";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";

interface INewGuest {
  name: string;
  ig: string;
}

export async function POST(req: Request) {
  try {
    const { name, ig }: INewGuest = await req.json();

    if (!name) throw new Error("Name is missing");
    if (!ig) throw new Error("Instagram handle is missing");

    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const usersCollection = await getUsersCollection();

    const result = await usersCollection.insertOne({ name, ig });

    return NextResponse.json(
      { message: "User created successfully", id: result.insertedId },
      { status: 200 }
    );
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
