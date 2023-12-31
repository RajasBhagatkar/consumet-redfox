import MovieDetails from '@/components/MovieDetails/MovieDetails'
import PageWrapper from '@/components/layoutComponents/PageWrapper'
import MainLayout from '@/layout/MainLayout'
import axios from 'axios'
import React from 'react'

export default function getMovieById({ id }) {
    // console.log(id)
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
    // console.log({ id })
    // try {
    //     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/info/${id}`)
    //     console.log(data)
    // } catch (error) {
    //     console.log("something error has found")
    //     // console.log(error)
    // }

    return {
        props: {
            id: id
        }
    }
}