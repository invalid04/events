import { Card } from "../ui/card";
import { CardTitle } from "../ui/card";

import { useQuery } from "@tanstack/react-query";

import { myEventQueryOptions } from "@/lib/api";

export function MyEventCard() {
    const { isPending, error, data: events } = useQuery(myEventQueryOptions)

    if (isPending) return '...'
    if (error) return '...'

    return (
        <ul>
            {events.map(event => (
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.maxAttendance}</p>
            ))}
        </ul>
    )
}