import { Card, CardTitle, CardContent, CardHeader } from "../ui/card";

import { useQuery } from "@tanstack/react-query";

import { myEventQueryOptions } from "@/lib/api";

export function MyEventCard() {

    const { isPending, error, data } = useQuery(myEventQueryOptions)

    if (isPending) return '...'
    if (error) return 'error'

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.experiences.map((experience) => (
                <Card key={experience.id}>
                    <CardHeader>
                        <CardTitle>Title: {experience.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Max Attendance: {experience.maxAttendance}</p>
                        <p>Date: {experience.date}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}