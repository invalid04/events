import { pgTable, serial, text, integer, foreignKey, timestamp, index, unique } from "drizzle-orm/pg-core";

export const eventAttendees = pgTable('event_attendees', {
    id: serial('id').primaryKey(), 
    eventId: integer('event_id').notNull(),
    userId: text('user_id').notNull(),
    createdAt: timestamp('created_at').defaultNow()
}, (eventAttendees) => {
    return {
        eventIdIndex: index('event_id_idx').on(eventAttendees.eventId),
        userIdIndex: index('user_id_idx').on(eventAttendees.userId),
        uniqueConstraint: unique('event_user_unique').on(eventAttendees.eventId, eventAttendees.userId)
    }
})