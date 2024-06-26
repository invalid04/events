import { numeric, pgTable, serial, text, index } from "drizzle-orm/pg-core";

export const experiences = pgTable('experiences', {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(), 
    title: text('title').notNull(),
    maxAttendance: numeric('maxAttnd').notNull()
}, (experiences) => {
    return {
        userIdIndex: index('name_idx').on(experiences.userId)
    }
} 
)