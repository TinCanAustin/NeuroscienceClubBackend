import { sql } from "drizzle-orm";
import { pgTable, serial, text, uuid, varchar, date, time } from "drizzle-orm/pg-core";

export const execTable = pgTable("exec", {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
    social: text("social"),
    position: text("position").notNull(),
    profilePic: text("profile pic"),
});

// export const execSocialsTable = pgTable("Exec_Social_Table", {
//     id: uuid('id').defaultRandom().primaryKey().notNull(),
//     Linkedin: text('Linkedin'),
//     Instagram: text('Instagram'),
//     Twitter: text('twitter')
// });

export const eventsTable = pgTable("events", {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('event name').notNull(),
    date: date("date", {mode: "date"}).notNull(),
    time: time({withTimezone: true}),
    location: text('location').notNull(),
    description: text("description").notNull(),
    bannerURL: text("banner url").notNull(),
    eventImage: text("images").array().default(sql`ARRAY[]::text[]`).notNull()
});

export const announcementTable = pgTable("announcements", {
    id: uuid('id').defaultRandom().primaryKey(),
    heading: text('heading').notNull(),
    date: date("date", {mode: "date"}).notNull(),
    url: text("url"),
    body: text("body").notNull()
}); 

export const formTable = pgTable("form", {
    id: uuid('id').defaultRandom().primaryKey(),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
    email: text("email").notNull(),
    body: text("body").notNull()
});

export type exec = typeof execTable.$inferInsert;
// export type exec_socials = typeof execSocialsTable.$inferInsert;
export type event = typeof eventsTable.$inferInsert;
export type announcement = typeof announcementTable.$inferInsert;
export type form = typeof formTable.$inferInsert;