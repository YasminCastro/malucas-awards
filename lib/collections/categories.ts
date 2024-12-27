import db from "@/lib/dbClient";
import { Collection } from "mongodb";

export interface INominees {
  ig: string;
  name: string;
  imagePath: string;
  votes?: number;
}

export interface ICategories {
  title: string;
  winner?: string;
  nominees?: INominees[];
}

export async function getCategoriesCollection(): Promise<
  Collection<ICategories>
> {
  const database = await db;

  const collection = database.collection<ICategories>("categories");

  await collection.createIndex({ title: 1 }, { unique: true });

  return collection;
}
