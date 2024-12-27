import {
  getCategoriesCollection,
  INominees,
} from "@/lib/collections/categories";
import { getUsersCollection, IUser } from "@/lib/collections/users";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";

interface IVoteRequest {
  ig: string; // Instagram handle of the voter
  categoryTitle: string;
  nomineeIg: string; // Instagram handle of the nominee
  action: "vote" | "unvote"; // Action to either vote or unvote
}

export async function POST(req: Request) {
  try {
    const { ig, categoryTitle, nomineeIg, action }: IVoteRequest =
      await req.json();

    if (!ig || !categoryTitle || !nomineeIg || !action) {
      return NextResponse.json(
        {
          message:
            "Por favor, forneça todas as informações necessárias para votar.",
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
    const categoriesCollection = await getCategoriesCollection();

    const user = await usersCollection.findOne({ ig });
    if (!user) {
      return NextResponse.json(
        {
          message:
            "Usuário não encontrado. Tem certeza que você está no Maluca Awards?",
        },
        { status: 400 }
      );
    }

    const category = await categoriesCollection.findOne({
      title: categoryTitle,
    });
    if (!category) {
      return NextResponse.json(
        { message: "Categoria não encontrada." },
        { status: 400 }
      );
    }

    const nominee = category.nominees?.find(
      (nominee) => nominee.ig === nomineeIg
    );
    if (!nominee) {
      return NextResponse.json(
        { message: "Indicado não encontrado na categoria." },
        { status: 400 }
      );
    }

    if (action === "vote") {
      if (user.votedCategories?.includes(categoryTitle)) {
        // Remover o voto anterior
        const previousNominee = category.nominees?.find(
          (nominee) =>
            user.votedCategories?.includes(categoryTitle) &&
            nominee.ig !== nomineeIg
        );
        if (previousNominee) {
          previousNominee.votes = (previousNominee.votes || 0) - 1;
          await categoriesCollection.updateOne(
            { title: categoryTitle, "nominees.ig": previousNominee.ig },
            { $set: { "nominees.$.votes": previousNominee.votes } }
          );
        }
      }

      nominee.votes = (nominee.votes || 0) + 1;
      await usersCollection.updateOne(
        { ig },
        { $addToSet: { votedCategories: categoryTitle } }
      );
    } else if (action === "unvote") {
      if (!user.votedCategories?.includes(categoryTitle)) {
        return NextResponse.json(
          { message: "Você ainda não votou nesta categoria." },
          { status: 400 }
        );
      }

      nominee.votes = (nominee.votes || 0) - 1;
      await usersCollection.updateOne(
        { ig },
        { $pull: { votedCategories: categoryTitle } }
      );
    }

    await categoriesCollection.updateOne(
      { title: categoryTitle, "nominees.ig": nomineeIg },
      { $set: { "nominees.$.votes": nominee.votes } }
    );

    return NextResponse.json(
      { message: "Voto registrado com sucesso." },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Algo deu errado. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
