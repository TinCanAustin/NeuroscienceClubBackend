import { db } from "./index";
import { exec, execTable } from "./schema";

export async function insertExec(_exec : exec){
    await db.insert(execTable).values(_exec);
    console.log("added new user");
}