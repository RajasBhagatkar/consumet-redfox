import store from '@/redux/store'
import '@/styles/globals.css'
import { Provider } from 'react-redux'

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../public/css/Control.css"

// 
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { setGlobalLoading } from '@/redux/features/globalLoadingSlice';
import Head from 'next/head';


function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setGlobalLoading(true);
    const handleComplete = (url) => (url === router.asPath) && setTimeout(() => { setGlobalLoading(false) }, 3000);

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  })
  return loading && (
    <>
      {/*  some loading animation will be here */}
    </>
  );

}


export default function App({ Component, pageProps }) {
  if (pageProps.statusCode === 404  ) {
    import ("../public/css/404/main.css")
    import ("../public/css/404/plugins.css")
    import ("../public/css/404/color-3.css")
    console.log("404 not found page requested")
  }
  console.log(pageProps.statusCode)

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Watch and Download Free Full Anime Online for free without registration on RedFox website." />
        <meta name="keywords" content="RedFox, free movie streaming, watch movie free, watch movies free, free movies online, watch tv shows online, watch tv series" />
        <meta name="author" content="RedFox D.D." />
        {/* <link rel="icon" href="/favicon.png" type="image/x-icon" /> */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://redfox.is-a.app' />
        <meta property='og:title' content='RedFox - Free HD Anime Streming - Watch HD Animes Free Online' />
        <meta property="og:site_name" content="RedFox" />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:image:width" content="650" />
        <meta property="og:image:height" content="650" />
        <meta property="og:description" content="Watch and Download Free Full Animes Online and Tv Shows Online for free without registration on RedFox website." />
        <title>RedFox - Free HD Anime Streaming - Watch HD Anime Free Online.</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" /> */}
        {/* <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" /> */}
        <link rel="icon" type="image/png" sizes="196x196" href="/favicon-196x196.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
