import { eq } from "drizzle-orm";
import { db } from "./index";
import { exec, execTable } from "./schema";

export async function insertExec(_exec : exec){
    await db.insert(execTable).values(_exec);
    console.log("added new user");
}

export async function deleteExec(id: number) {
    await db.delete(execTable).where(eq(execTable.id, id));
}