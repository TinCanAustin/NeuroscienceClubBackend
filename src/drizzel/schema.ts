import { sql } from "drizzle-orm";
import { pgTable, serial, text, uuid, varchar, date, boolean } from "drizzle-orm/pg-core";

export const execTable = pgTable("exec", {
    id: serial('id').primaryKey(),
    name: text("name").notNull(),
    stream: text("stream").notNull(),
    linkedin: text("linkedin")
});

export const eventsTable = pgTable("events", {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('event name').notNull(),
    _date: date("date", {mode: "date"}).notNull(),
    stauts: boolean("event status").default(sql`FALSE`).notNull(),
    bannerURL: text("banner url").notNull(),
    eventImage: text("images").array().default(sql`ARRAY[]::text[]`).notNull()
});

export type exec = typeof execTable.$inferInsert;