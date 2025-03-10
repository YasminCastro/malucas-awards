import {
  getCategoriesCollection,
  ICategories,
  INominees,
} from "@/lib/collections/categories";
import { getUsersCollection } from "@/lib/collections/users";
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

    if (!title) {
      return NextResponse.json(
        { message: "Por favor, forneça o título da categoria." },
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
    const categoriesCollection = await getCategoriesCollection();

    const updateFields: Partial<ICategories> = {};
    if (winner !== undefined) updateFields.winner = winner;

    if (nominees !== undefined) {
      const nomineesData: INominees[] = [];
      for (const ig of nominees) {
        const user = await usersCollection.findOne({ ig });
        if (user) {
          nomineesData.push({
            ig: user.ig,
            imagePath: user.imagePath,
            name: user.name,
            votes: 0,
          });
        } else {
          return NextResponse.json(
            { message: `Usuário com o Instagram ${ig} não encontrado.` },
            { status: 400 }
          );
        }
      }
      nomineesData.sort((a, b) => a.name.localeCompare(b.name));
      updateFields.nominees = nomineesData;
    }

    const result = await categoriesCollection.findOneAndUpdate(
      { title },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Categoria já existe" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Algo deu errado. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
