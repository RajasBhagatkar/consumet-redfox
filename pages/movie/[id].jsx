"use client"
import MovieDetails from '@/components/MovieDetails/MovieDetails'
import PageWrapper from '@/components/layoutComponents/PageWrapper'
import getMovieInfo from '@/hooks/getMovieInfo'
import getServerInfo from '@/hooks/getServerInfo'
import MainLayout from '@/layout/MainLayout'
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice'
import axios from 'axios'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'

export default function GetMovieById({ id }) {
    const { data, error, isLoading: isMovieLoading } = getMovieInfo(id);
    const { data: serverData, error: serverError, isLoading: isServerLoading } = getServerInfo(data ? data.episodes[0]["id"] : "");

    const dispatch = useDispatch();

    // when eighter of them are under loading
    dispatch(setGlobalLoading(isMovieLoading || isServerLoading));

    /**
        const isLoading = useMemo(() => isMovieLoading || isServerLoading, [isMovieLoading, isServerLoading]);
        useEffect(() => {
            dispatch(setGlobalLoading(isLoading));
        }, [isLoading, dispatch]);
     * 
     */

    return (
        <>
            <MainLayout>
                <PageWrapper state={'search'}>
                    {data && serverData && <MovieDetails mediaId={id} movieInfo={data} availableServers={serverData} />}
                </PageWrapper>
            </MainLayout>

        </>

    )
}

export async function getServerSideProps(context) {
    const { id } = context.params

    return {
        props: {
            id: id,
        }
    }
}