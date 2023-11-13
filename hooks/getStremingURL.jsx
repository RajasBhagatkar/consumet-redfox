import fetcher from '@/api/fetcher'
import React from 'react'
import useSwr from 'swr'

export default function getStremingURL(id, server = "gogocdn") {

    const { data, error, isLoading } = useSwr(`/watch/${id}?server=${server}`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return {
        data,
        isLoading,
        error
    }
}
