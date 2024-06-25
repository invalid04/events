import { useState } from 'react';
import {
    Card,
    CardDescription,
    CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'

import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

async function getAllEvents() {
  const res = await api.experiences.$get()
  if (!res.ok) {
    throw new Error('server-error')
  }
  const data = await res.json()
  return data
}

export default function EventCard() {
    const [attendees, setAttendees] = useState(120); // Initial number of people going
    const [isGoing, setIsGoing] = useState(false);

    const { isPending, error, data } = useQuery({
      queryKey: ['get-all-events'],
      queryFn: getAllEvents,
    }) 
  
    const handleGoingClick = () => {
      if (!isGoing) {
        setAttendees(attendees + 1);
        setIsGoing(true);
      }
    };
  
    return (
      <div>as</div>
    );
}