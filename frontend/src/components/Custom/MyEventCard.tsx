import { Card } from "../ui/card";
import { CardTitle } from "../ui/card";

import { useQuery } from "@tanstack/react-query";

import { myEventQueryOptions } from "@/lib/api";

export function MyEventCard() {

    const { isPending, error, data } = useQuery(myEventQueryOptions)

    if (isPending) return '...'
    if (error) return 'error'

    return (
        <div>
            {data.experiences.map((experience) => (
                <div key={experience.id}>
                    <p>{experience.title}</p>
                    <p>{experience.maxAttendance}</p>
                    <p>{experience.date}</p>
                </div>
            ))}
        </div>
    )
}