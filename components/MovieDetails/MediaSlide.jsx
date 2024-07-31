import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
// import mediaApi from "../../api/modules/media.api";
import AutoSwiper from './AutoSwiper';
import { toast } from 'react-toastify';
import MediaItem from '../SearchComponent/MediaItem';
import axios from 'axios';
import { Grid } from '@mui/material';

//# HOME SLIDER 
const MediaSlide = ({ data, mediaType }) => {

  return (
    // <AutoSwiper>
    //   {data.map((media, index) => (
    //     <SwiperSlide key={index}>
    //       <MediaItem
    //         media={media}
    //         mediaType={mediaType}
    //       />
    //     </SwiperSlide>
    //   ))}
    // </AutoSwiper>

    <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
      {data.map((media, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaSlide;
