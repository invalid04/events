import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";

import { useQuery } from "@tanstack/react-query";

import { userQueryOptions } from '@/lib/api'


export function ProfileCard() {

    const { isPending, error, data } = useQuery(userQueryOptions)

    if (isPending) return 'loading'
    if (error) return 'not logged in'

    return (
        <Card className='w-36 h-16 flex justify-center items-center gap-4'>
            <Avatar>
                {data.user.picture && (
                    <AvatarImage src={data.user.picture} alt={data.user.given_name} />
                )}
                <AvatarFallback>{data.user.given_name}</AvatarFallback>
            </Avatar>
            <h1>{data.user.given_name}</h1>
        </Card>
    )
}