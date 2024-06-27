import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";

const client = hc<ApiRoutes>('/')

export const api = client.api

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
    const res = await api.experiences.$get()
    if (!res.ok) {
      throw new Error('server-error')
    }

    const data = await res.json()
    return data
}

export const eventQueryOptions = queryOptions({
    queryKey: ['get-all-events'],
    queryFn: getAllEvents,
    staleTime: 1000 * 60 * 5,
})