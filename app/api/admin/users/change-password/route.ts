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

    if (!ig) {
      return NextResponse.json(
        { message: "Instagram handle is missing" },
        { status: 400 }
      );
    }

    const database = await db;
    if (!database) {
      return NextResponse.json(
        { message: "Database is not connected" },
        { status: 500 }
      );
    }

    const usersCollection = await getUsersCollection();

    const user = await usersCollection.findOne({ ig });
    if (!user) {
      return NextResponse.json(
        {
          message:
            "Você não está cadastrado no Maluca Awards. Se você não faz parte do grupo, que pena, não poderá votar. Agora, se faz parte e mesmo assim não aparece, fala com a Yasmin pra ela te cadastrar.",
        },
        { status: 400 }
      );
    }

    if (user.passwordSet) {
      return NextResponse.json(
        {
          message:
            "Você já alterou a senha uma vez, agora entre em contato com o suporte (a Yasmin mesmo) e peça para ela trocar a senha para você.",
        },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const result = await usersCollection.findOneAndUpdate(
      { ig },
      { $set: { passwordHash, passwordSet: true } },
      { returnDocument: "after" }
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
