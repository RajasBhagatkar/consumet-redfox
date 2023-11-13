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
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
