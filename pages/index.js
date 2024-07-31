import HeroSlide from '@/components/HomePage/HeroSlide';
import MediaSlide from '@/components/MovieDetails/MediaSlide';
import Container from '@/components/layoutComponents/Container';
import PageWrapper from '@/components/layoutComponents/PageWrapper';
import tmdbConfigs from '@/configs/tmdb.configs';
import uiConfigs from '@/configs/ui.configs';
import MainLayout from '@/layout/MainLayout';
import { Box } from '@mui/material';
import Image from 'next/image'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


export default function Home() {
  return (
    <>
      <span>
        <MainLayout>
          <PageWrapper state={'home'} >
            <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
            {/* <h1>hello there</h1> */}
            <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }} >
              <Container header="popular anime">
                {/* <MediaSlide /> */}
              </Container>

            </Box>
          </PageWrapper>
        </MainLayout>
      </span>
    </>

  )
}
// export async function getServerSideProps() {

// }