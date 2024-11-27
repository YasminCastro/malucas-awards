import { getUsersCollection } from "@/lib/collections/users";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";

interface IUpdateGuest {
  ig: string;
}

export async function DELETE(req: Request) {
  try {
    const { ig }: IUpdateGuest = await req.json();

    if (!ig) throw new Error("Instagram handle is missing");

    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const usersCollection = await getUsersCollection();

    const result = await usersCollection.findOneAndDelete({ ig });

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
