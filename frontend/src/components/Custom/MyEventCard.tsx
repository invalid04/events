import { Card } from "../ui/card";
import { CardTitle } from "../ui/card";

import { useQuery } from "@tanstack/react-query";

import { myEventQueryOptions } from "@/lib/api";

export function MyEventCard() {
    const { isPending, error, data: events } = useQuery(myEventQueryOptions)

    if (isPending) return '...'
    if (error) return '...'

    return (
        <h1>nothing</h1>
    )
}