import { pgTable, serial, text, uuid, varchar } from "drizzle-orm/pg-core";

export const execTable = pgTable("exec", {
    id: serial('id').primaryKey(),
    name: text("name").notNull(),
    stream: text("stream").notNull(),
    linkedin: text("linkedin")
});

export const eventsTable = pgTable("events", {
    id: uuid('id').defaultRandom().primaryKey(),
});

export type exec = typeof execTable.$inferInsert;