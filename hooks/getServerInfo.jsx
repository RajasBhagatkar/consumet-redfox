import fetcher from '@/api/fetcher'
import React from 'react'
import useSwr from 'swr'

export default function getServerInfo(episodeId) {

    const { data, error, isLoading } = useSwr(episodeId ? `${process.env.NEXT_PUBLIC_BASE_URL}/servers/${episodeId}` : "", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    return {
        data,
        error,
        isLoading
    }
}