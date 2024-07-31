import fetcher from '@/api/fetcher'
import React from 'react'
import useSwr from 'swr'

export default function getMovieInfo(id) {

    const { data, error, isLoading } = useSwr(id ? `https://consumet-api-nqgo.onrender.com/anime/gogoanime/info/${id}` : "", fetcher, {
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
