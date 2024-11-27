if (!process.env.MONGO_URL) {
  throw new Error("MONGO URL NOT DEFINED");
}

if (!process.env.DB_NAME) {
  throw new Error("DB_NAME NOT DEFINED");
}

export const MONGO_URL = process.env.MONGO_URL;
export const DB_NAME = process.env.DB_NAME;
