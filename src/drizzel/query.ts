import { count, eq } from "drizzle-orm";
import { db } from "./index";
import { exec, execTable } from "./schema";

export async function insertExec(_exec : Omit<exec, "id">){
    await db.insert(execTable).values(_exec);
    console.log("added new user");
}

export async function deleteExec(id: number) : Promise<exec[]>{
    return db.delete(execTable).where(eq(execTable.id, id)).returning();
}

export async function getExec(id: number){
    return db.select().from(execTable).where(eq(execTable.id, id));
}