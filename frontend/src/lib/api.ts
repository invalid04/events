import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";
import { QueryClient, queryOptions, QueryFunction } from "@tanstack/react-query";

import { type CreateExperience } from "@server/sharedTypes";

const client = hc<ApiRoutes>('/')

export const api = client.api

export const queryClient = new QueryClient()

// user query

async function getCurrentUser() {
    const res = await api.me.$get()
    if (!res.ok) {
        throw new Error('server-error')
    }

    const data = await res.json()
    return data
}

export const userQueryOptions = queryOptions({
    queryKey: ['get-current-user'],
    queryFn: getCurrentUser,
    staleTime: Infinity
})


// event query

async function getAllEvents() {
    const res = await api.experiences['all-events'].$get()
    if (!res.ok) {
      throw new Error('server error')
    }

    const data = await res.json()
    return data
}

export const eventQueryOptions = queryOptions({
    queryKey: ['get-all-events'],
    queryFn: getAllEvents,
    staleTime: 1000 * 60 * 5,
})

// user event query

export async function getMyEvents() {
    const res = await api.experiences.$get()

    if(!res.ok) {
        throw new Error('server error')
    }

    const data = await res.json()
    return data
}

export const myEventQueryOptions = queryOptions({
    queryKey: ['get-my-events'],
    queryFn: getMyEvents,
})

// create experience

export async function createExperience({ value } : { value: CreateExperience }) {
    const res = await api.experiences.$post({ json: value })
    if (!res.ok) {
        throw new Error('server error')
    }

    const newExperience = await res.json()
    return newExperience
}

export const loadingCreateExperienceQueryOptions = queryOptions<{
    experience?: CreateExperience
}>({
    queryKey: ['loading-create-experience'],
    queryFn: async () => {
        return {}
    },
    staleTime: Infinity,
})

// delete event function

export async function deleteExperience({ id } : { id: number }){
    const res = await api.experiences[':id{[0-9]+}'].$delete({ 
        param: { id: id.toString() } 
    })

    if (!res.ok) {
        throw new Error('server error')
    }
}

export async function attendEvent({ eventId, userId }: { eventId: number, userId: string}) {
    const res = await api.attendees['attend'].$post({
        json: { eventId, userId }
    })

    if (!res.ok) {
        throw new Error('server error')
    }

    const data = await res.json()
    return data
}

export const attendEventMutationOptions = {
    mutationFn: attendEvent,
}

// get attendees per event

export async function getTotalAttendees({ id } : { id: number }) {
    const res = await api.attendees[':id{[0-9]+}'].$get({
        param: { id: id.toString() }
    })
    if(!res.ok) {
        throw new Error('server error')
    }
    const data = await res.json()
    return data.total[0].count
}

export const totalAttendeeOptions = queryOptions({
    queryKey: ['get-total-attendees'],
    queryFn: getTotalAttendees as any,
})