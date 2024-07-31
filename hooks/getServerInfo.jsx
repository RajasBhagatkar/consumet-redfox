import fetcher from '@/api/fetcher'
import React from 'react'
import useSwr from 'swr'

export default function getServerInfo(episodeId) {

    const { data, error, isLoading } = useSwr(episodeId ? `https://consumet-api-nqgo.onrender.com/anime/gogoanime/servers/${episodeId}` : "", fetcher, {
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