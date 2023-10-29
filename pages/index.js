import PageWrapper from '@/components/layoutComponents/PageWrapper';
import MainLayout from '@/layout/MainLayout';
import Image from 'next/image'
import { useSelector } from 'react-redux';

export default function Home() {
  return (
    <>
      <MainLayout>
        <PageWrapper state={'home'} >

        </PageWrapper>
      </MainLayout>
    </>

  )
}
