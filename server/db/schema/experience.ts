import { numeric, pgTable, serial, text, index, timestamp, date, time } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { z } from 'zod'

export const experiences = pgTable('experiences', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(), 
    title: text('title').notNull(),
    desc: text('description').notNull(),
    time: time('time', { withTimezone: true} ).notNull(),
    location: text('location').notNull(),
    maxAttendance: numeric('maxAttnd').notNull(),
    date: date('date').notNull(),
    createdAt: timestamp('created_at').defaultNow()
}, (experiences) => {
    return {
        userIdIndex: index('name_idx').on(experiences.userId)
    }
} 
)

export const insertExperiencesSchema = createInsertSchema(experiences, {
    id: z.number().int().positive().min(1),
    title: z
        .string()
        .min(5, { message: 'Title must be at least 5 characters' }),
    maxAttendance: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: 'Must enter a number' }),
    location: z.string().min(5, { message: 'Must enter a valid location'}),
    desc: z.string().min(5, { message: 'Please write a longer description' })
})

export const selectExperiencesSchema = createSelectSchema(experiences)