import { getUsersCollection } from "@/lib/collections/users";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface IUpdateGuest {
  ig: string;
  password: string;
}

export async function PUT(req: Request) {
  try {
    const { ig, password }: IUpdateGuest = await req.json();

    if (!ig) throw new Error("Instagram handle is missing");

    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const usersCollection = await getUsersCollection();

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const result = await usersCollection.findOneAndUpdate(
      { ig },
      { $set: { passwordHash, passwordSet: true } },
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
