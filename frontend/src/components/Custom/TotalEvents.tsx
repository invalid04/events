import { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '../ui/card'

export default function TotalEvents() {

    const [total, setTotal] = useState(0)

    useEffect(() => {
        async function fetchTotal() {
            const res = await fetch('/api/events/total-events')
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
