import HeroSlide from '@/components/HomePage/HeroSlide';
import PageWrapper from '@/components/layoutComponents/PageWrapper';
import tmdbConfigs from '@/configs/tmdb.configs';
import MainLayout from '@/layout/MainLayout';
import Image from 'next/image'
import { useSelector } from 'react-redux';


export default function Home() {
  return (
    <>
      <span>
        <MainLayout>
          <PageWrapper state={'home'} >
            <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular} />
            <h1>hello there</h1>
          </PageWrapper>
        </MainLayout>
      </span>
    </>

  )
}
