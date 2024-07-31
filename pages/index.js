import axios from '@/api/axios';
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


export default function Home({ trendingAnime, recentAnimeEpisodes }) {
  return (
    <>
      <span>
        <MainLayout>
          <PageWrapper state={'home'} >
            <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
            {/* <h1>hello there</h1> */}
            <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }} >
              <Container header="Trending Anime">
                <MediaSlide data={trendingAnime.results} mediaType={"movie"} />
              </Container>

              <Container header="Recent Anime Episodes">
                <MediaSlide data={recentAnimeEpisodes.results} mediaType={"movie"} />
              </Container>
            </Box>
          </PageWrapper>
        </MainLayout>
      </span>
    </>

  )
}
export async function getServerSideProps() {
  let top_aring = null;
  let recent_episodes = null;
  try {
    /**
     * 
     * {
        id: String,
        title: String,
        image: Link,
        url: Link,
        genres: [Array],
        episodeId: String,
        episodeNumber: number
      }[]
     */
    const top_aring_response = await axios.get("/top-airing")
    const recent_episodes_response = await axios.get("/recent-episodes")
    top_aring = top_aring_response.data;
    recent_episodes = recent_episodes_response.data
    /**
     *     
     * {
            id: String,
            episodeId: String,
            episodeNumber: Number,
            title: String,
            image: Link,
            url: Link
          },
     */
    // console.log(recent_episodes_response.data)

  } catch (e) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      trendingAnime: top_aring,
      recentAnimeEpisodes: recent_episodes
    }
  }
}