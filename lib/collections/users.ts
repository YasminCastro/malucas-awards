import db from "@/lib/dbClient";
import { Collection } from "mongodb";

export interface IUser {
  name: string;
  ig: string;
  imagePath: string;
}

export async function getUsersCollection(): Promise<Collection<IUser>> {
  const database = await db;

  const collection = database.collection<IUser>("users");

  await collection.createIndex({ ig: 1 }, { unique: true });

  return collection;
}
