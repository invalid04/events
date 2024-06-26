import { numeric, pgTable, serial, text, index, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const experiences = pgTable('experiences', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(), 
    title: text('title').notNull(),
    maxAttendance: numeric('maxAttnd').notNull(),
    createdAt: timestamp('created_at').defaultNow()
}, (experiences) => {
    return {
        userIdIndex: index('name_idx').on(experiences.userId)
    }
} 
)

export const insertExperiencesSchema = createInsertSchema(experiences)

export const selectExperiencesSchema = createSelectSchema(experiences)