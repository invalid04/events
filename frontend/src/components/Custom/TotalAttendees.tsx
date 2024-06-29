import { totalAttendeeOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function TotalAttendees({ id }: {id: number}) {
    const { isPending, error, data } = useQuery(totalAttendeeOptions(id))

    if (isPending) return '...'
    if (error) return 'error'

    if (typeof data !== 'number') {
        return 'no data available'
    }

    return (
        <p>{data}</p>
    )
}