import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from './schema';
import path from 'path';

import dotenv from "dotenv";
dotenv.config({path: path.resolve(__dirname, "../.env")});

const connection = process.env.DATABASE_URL!;

export const client = postgres(connection, { prepare : false });
export const db = drizzle(client, { schema : schema });