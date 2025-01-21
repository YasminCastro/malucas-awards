import { getUsersCollection } from "@/lib/collections/users";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IUpdateGuest {
  ig: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { ig, password }: IUpdateGuest = await req.json();

    if (!ig) {
      return NextResponse.json(
        {
          message:
            "Por favor, forneça o Instagram. Não dá pra se cadastrar sem isso, né?",
        },
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

    const user = await usersCollection.findOne({ ig });
    if (!user) {
      return NextResponse.json(
        {
          message:
            "Você não está cadastrado no Maluca Awards. Se você não faz parte do grupo, que pena, não poderá votar. Agora, se faz parte e mesmo assim não aparece, fala com a Yas pra ela te cadastrar.",
        },
        { status: 400 }
      );
    }

    if (user.passwordSet) {
      return NextResponse.json(
        {
          message:
            "Você já alterou a senha uma vez, agora entre em contato com o suporte (a Yas mesmo) e peça para ela trocar a senha para você.",
        },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    await usersCollection.findOneAndUpdate(
      { ig },
      { $set: { passwordHash, passwordSet: true } },
      { returnDocument: "after" }
    );

    const token = jwt.sign({ ig: user.ig }, process.env.SECRET_TOKEN!);

    return NextResponse.json({ token }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        message:
          "Algo deu errado. Tente novamente mais tarde ou fale com a Yas.",
      },
      { status: 500 }
    );
  }
}
