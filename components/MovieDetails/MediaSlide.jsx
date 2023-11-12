import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
// import mediaApi from "../../api/modules/media.api";
import AutoSwiper from './AutoSwiper';
import { toast } from 'react-toastify';
import MediaItem from '../SearchComponent/MediaItem';
import axios from 'axios';

//# HOME SLIDER 
const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [
    medias,
    setMedias
  ] = useState([]);

  useEffect(
    () => {
      const getMedias = async () => {
        try {
          const { data } = await axios.get(
            `https://moonflix-api.vercel.app/api/v1/${mediaType}/${mediaCategory}?page=${'1'}`
          );
          setMedias(data.results);
        } catch (err) {
          if (err) toast.error(err.message);
        }
      };

      getMedias();
    },
    [
      mediaType,
      mediaCategory
    ]
  );

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem
            media={media}
            mediaType={mediaType}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
