import { sql } from "drizzle-orm";
import { pgTable, serial, text, uuid, varchar, date, boolean } from "drizzle-orm/pg-core";

export const execTable = pgTable("exec", {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
    email: text("email").notNull(),
    gender: text("gender").notNull(),
    pronouns: text("pronouns"),
    stream: text("stream").notNull(),
    position: text("position").notNull(),
    socialID : uuid("socialID").references(() => execSocialsTable.id),
    profilePic: text("profile pic"),
    info: text("info").notNull()
});

export const execSocialsTable = pgTable("Exec_Social_Table", {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    Linkedin: text('Linkedin'),
    Instagram: text('Instagram'),
    Twitter: text('twitter')
});

export const eventsTable = pgTable("events", {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('event name').notNull(),
    date: date("date", {mode: "date"}).notNull(),
    description: text("description").notNull(),
    stauts: boolean("event status").default(sql`FALSE`).notNull(),
    bannerURL: text("banner url").notNull(),
    eventImage: text("images").array().default(sql`ARRAY[]::text[]`).notNull()
});

export const announcementTable = pgTable("announcements", {
    id: uuid('id').defaultRandom().primaryKey(),
    heading: text('heading').notNull(),
    date: date("date", {mode: "date"}).notNull(),
    body: text("body").notNull()
}); 

export type exec = typeof execTable.$inferInsert;
export type exec_socials = typeof execSocialsTable.$inferInsert;
export type event = typeof eventsTable.$inferInsert;
export type announcement = typeof announcementTable.$inferInsert;