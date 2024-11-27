import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const execTable = pgTable("exec", {
    id: serial('id').primaryKey(),
    name: text("name").notNull(),
    stream: text("stream").notNull(),
    linkedin: text("linkedin")
});

export type exec = Omit<typeof execTable.$inferInsert, "id">;