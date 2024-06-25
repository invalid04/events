import { useState, useEffect } from 'react'
import {
    Card,
    CardHeader,
    CardTitle
} from '../ui/card'
import { hc } from 'hono/client'
import { type ApiRoutes } from '../../../../server/app'

const client = hc<ApiRoutes>('/')

export default function TotalEvents() {

    const [total, setTotal] = useState(0)

    useEffect(() => {
        async function fetchTotal() {
            const res = await client.api.events['total-events'].$get()
            const data = await res.json()
            setTotal(data.total)
        }
        fetchTotal()
    }, [])

    return (
        <Card className='max-w-sm flex justify-center'>
            <CardHeader>
                <CardTitle>Current Events: {total}</CardTitle>
            </CardHeader>
        </Card>
    )
}
