import fetcher from '@/api/fetcher'
import React from 'react'
import useSwr from 'swr'

export default function getMovies({ query, page = 1 }) {
    const { data, error, isLoading } = useSwr(`https://moonflix-api.vercel.app/api/v1/movie/search?query=${query}&page=${page}`, fetcher, {
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
