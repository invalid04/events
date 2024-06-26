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
                <AvatarImage src={data.user.picture ?? undefined} alt='profile pic' />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1>{data.user.given_name}</h1>
        </Card>
    )
}