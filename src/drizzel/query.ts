import { count, eq } from "drizzle-orm";
import { db } from "./index";
import { exec, execTable, event, eventsTable } from "./schema";

export async function insertExec(_exec : Omit<exec, "id">){
    await db.insert(execTable).values(_exec);
}

export async function deleteExec(id: number) : Promise<exec[]>{
    return db.delete(execTable).where(eq(execTable.id, id)).returning();
}

export async function getExec(id: number){
    return db.select().from(execTable).where(eq(execTable.id, id));
}

export async function insertEvent(_event : Omit<Omit<event, "id">, "eventImage">){
    await db.insert(eventsTable).values(_event);
}

export async function getEventPhoto(_id: string){
    return await db.select({image: eventsTable.eventImage}).from(eventsTable).where(eq(eventsTable.id, _id));
}