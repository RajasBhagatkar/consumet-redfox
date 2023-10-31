import MovieDetails from '@/components/MovieDetails/MovieDetails'
import PageWrapper from '@/components/layoutComponents/PageWrapper'
import MainLayout from '@/layout/MainLayout'
import React from 'react'

export default function getMovieById({ id }) {
    console.log(id)
    return (
        <>
            <MainLayout>
                <PageWrapper state={'search'}>
                    <MovieDetails mediaType={"movie"} mediaId={id} />
                </PageWrapper>
            </MainLayout>

        </>

    )
}

export async function getServerSideProps(context) {
    const { id } = context.params

    return {
        props: {
            id: id
        }
    }
}