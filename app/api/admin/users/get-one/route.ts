import { getUsersCollection } from "@/lib/collections/users";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const voterIg = url.searchParams.get("voterIg");

    if (!voterIg) {
      return NextResponse.json(
        { message: "Por favor, forneça o Instagram do usuário." },
        { status: 400 }
      );
    }

    const database = await db;
    if (!database) {
      return NextResponse.json(
        {
          message:
            "Ops! Parece que o banco de dados tirou um cochilo. Tente novamente mais tarde.",
        },
        { status: 500 }
      );
    }

    const usersCollection = await getUsersCollection();
    const user = await usersCollection.findOne({ ig: voterIg });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Algo deu errado. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
