import SearchBody from '@/components/SearchComponent/SearchBody'
import PageWrapper from '@/components/layoutComponents/PageWrapper'
import MainLayout from '@/layout/MainLayout'
import { Toolbar } from '@mui/material'
import React from 'react'



export default function search() {
    return (

        <MainLayout>
            <PageWrapper state={'search'}>
                <SearchBody />
            </PageWrapper>
        </MainLayout>
    )
}
