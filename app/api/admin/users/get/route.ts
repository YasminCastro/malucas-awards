import { getUsersCollection } from "@/lib/collections/users";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const usersCollection = await getUsersCollection();

    const result = await usersCollection.find().toArray();

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
