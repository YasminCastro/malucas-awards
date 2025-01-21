import { getUsersCollection } from "@/lib/collections/users";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface ILoginRequest {
  ig: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { ig, password }: ILoginRequest = await req.json();

    if (!ig || !password) {
      return NextResponse.json(
        {
          message:
            "Por favor, forneça o Instagram e a senha. Não dá pra logar sem isso, né?",
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
            "Usuário não encontrado. Tem certeza que você está no Grupo das Malucas?",
        },
        { status: 400 }
      );
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        {
          message:
            "Parece que você ainda não definiu uma senha. Que tal fazer isso primeiro?",
        },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Senha inválida. Tente novamente.",
        },
        { status: 400 }
      );
    }

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
