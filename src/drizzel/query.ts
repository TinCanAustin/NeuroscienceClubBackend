import { count, eq } from "drizzle-orm";
import { db } from "./index";
import { exec, execTable, event, eventsTable, announcement, announcementTable } from "./schema";

//execs
export async function insertExec(_exec : Omit<exec, "id">){
    await db.insert(execTable).values(_exec);
}

export async function deleteExec(id: string) : Promise<exec[]>{
    return db.delete(execTable).where(eq(execTable.id, id)).returning();
}

export async function getExec(id: string){
    return db.select().from(execTable).where(eq(execTable.id, id));
}

export async function getExecs() {
    return await db.select().from(execTable);
}

//events 
export async function insertEvent(_event : Omit<Omit<event, "id">, "eventImage">){
    await db.insert(eventsTable).values(_event);
}

export async function getEventPhoto(_id: string){
    return await db.select({image: eventsTable.eventImage}).from(eventsTable).where(eq(eventsTable.id, _id));
}

export async function addEventImage(_id:string, _array: string[]) {
    await db.update(eventsTable).set({eventImage: _array}).where(eq(eventsTable.id, _id));
}

export async function deleteEvent(_id: string){
    return await db.delete(eventsTable).where(eq(eventsTable.id, _id)).returning();
}

export async function getEvents() {
    return await db.select().from(eventsTable);
}

export async function getEvent(_id: string) {
    return await db.select().from(eventsTable).where(eq(eventsTable.id, _id));
}

//announcments
export async function addAnnouncement(_announcement : Omit<announcement, "id">) {
    await db.insert(announcementTable).values(_announcement);
}

export async function getAnnouncements() {
    return await db.select().from(announcementTable);
}

export async function getAnnouncement(id:string) {
    return await db.select().from(announcementTable).where(eq(announcementTable.id, id));
}

export async function deleteAnnouncement(id:string) {
    return await db.delete(announcementTable).where(eq(announcementTable.id, id)).returning();
}