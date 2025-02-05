import {
  getCategoriesCollection,
  INominees,
} from "@/lib/collections/categories";
import db from "@/lib/dbClient";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const database = await db;
    if (!database) throw new Error("Database is not connected");

    const categoriesCollection = await getCategoriesCollection();

    const categories = await categoriesCollection.find().toArray();

    let result: any = [];

    for (let category of categories) {
      if (category.title === "Todas as malucas (atualizado - 21/01/2025)") {
        continue;
      }

      let mostVotes: INominees = {
        ig: "",
        imagePath: "",
        name: "",
        votes: 0,
      };

      let nomineesWithMostVotes: INominees[] = [];

      for (let nominee of category.nominees) {
        if (nominee.votes > 0 && nominee.votes > mostVotes.votes) {
          mostVotes = nominee;
          nomineesWithMostVotes = [nominee];
        } else if (nominee.votes === mostVotes.votes) {
          nomineesWithMostVotes.push(nominee);
        }
      }

      if (nomineesWithMostVotes.length > 1) {
        result.push({ title: category.title, drew: nomineesWithMostVotes });
      } else {
        result.push({ title: category.title, winner: mostVotes });
      }
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
