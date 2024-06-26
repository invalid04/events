import {
    Card,
    CardHeader,
    CardTitle
} from '../ui/card'

import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

async function getTotalEvents() {
    const res = await api.experiences['total-experiences'].$get()
    if (!res.ok) {
        throw new Error('server error')
    }
    const data = await res.json()
    return data.total[0].count
}

export default function TotalEvents() {

    const { isPending, error, data } = useQuery({
        queryKey: ['get-total-events'],
        queryFn: getTotalEvents
    })

    if (error) return 'An error has occurred: ' + error.message

    return (
        <Card className='max-w-sm flex justify-center'>
            <CardHeader>
                <CardTitle>
                    Current Events: {' '}
                    {isPending ? '...': data}
                </CardTitle>
            </CardHeader>
        </Card>
    )
}
