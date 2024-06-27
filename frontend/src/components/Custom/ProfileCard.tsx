import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { useQuery } from "@tanstack/react-query";

import { userQueryOptions } from '@/lib/api'

export function ProfileCard() {

    const { isPending, error, data } = useQuery(userQueryOptions)

    if (isPending) return 'loading'
    if (error) return 'not logged in'

    return (
        <Card className='flex flex-col max-w-sm h-34 items-center justify-between p-4 md:mb-6 mx-auto md:mx-0 mt-2'>
            <div className='flex items-center space-x-4'>
                <Avatar>
                    {data.user.picture && (
                        <AvatarImage src={data.user.picture} alt={data.user.given_name} />
                    )}
                    <AvatarFallback>{data.user.given_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1>{data.user.given_name}</h1>
            </div>
            <Separator className='w-full my-4' />
            <Button asChild className='w-full'>
                <a href='/api/logout'>Logout</a>
            </Button>
        </Card>
    )
}