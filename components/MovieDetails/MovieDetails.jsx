import React from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Divider, Grid, List, ListItem, Paper, Stack, Typography, useMediaQuery, } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CircularRate from '../HomePage/CircularRate';
import Container from '../layoutComponents/Container';
import ImageHeader from './ImageHeader';


import uiConfigs from '@/configs/ui.configs';
import tmdbConfigs from '@/configs/tmdb.configs';
// mediaAPI
// favoriteApi

import { setGlobalLoading } from '@/redux/features/globalLoadingSlice';
import { setAuthModalOpen } from '@/redux/features/authModalSlice';
import { addFavorite, removeFavorite } from '@/redux/features/userSlice';

import CastSlide from './CastSlide';
import MediaVideosSlide from './MediaVideosSlide';
import BackdropSlide from './BackdropSlide';
import PosterSlide from './PosterSlide';
import RecommendSlide from './RecommendSlide';
import MediaSlide from './MediaSlide';
import axios from 'axios';
import { data } from 'autoprefixer';
import MediaReview from './MediaReview';
import { styled } from "@mui/system";
import DnsIcon from '@mui/icons-material/Dns';
import { useTheme } from '@emotion/react';
import VideoPlayer from '../Player/VideoPlayer';
// MediaReview










export default function MovieDetails({ mediaType, mediaId }) {


    const { user, listFavorites } = useSelector((state) => state.user);

    const [media, setMedia] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [onRequest, setOnRequest] = useState(false);
    const [genres, setGenres] = useState([]);

    const dispatch = useDispatch();

    const videoRef = useRef(null);

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [selectedServer, setSelectedServer] = useState("VidCloud");
    const [selectedEpisode, setSelectedEpisode] = useState(0);

    const handleServerChange = (value) => {
        setSelectedServer(value);
    }


    useEffect(() => {
        window.scrollTo(0, 0);
        const getMedia = async () => {
            dispatch(setGlobalLoading(true));
            try {

                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/info/${mediaId}`)

                if (data) {
                    console.log(data.recommend)
                    setMedia(data);
                    // setIsFavorite(data.isFavorite);
                    // setGenres(data.genres.splice(0, 2));
                }
            } catch (err) {

                if (err) toast.error(err.message);

            }

            dispatch(setGlobalLoading(false));


        };

        getMedia();
    }, [mediaType, mediaId, dispatch]);

    const onFavoriteClick = async () => {
        if (!user) return dispatch(setAuthModalOpen(true));

        if (onRequest) return;

        if (isFavorite) {
            onRemoveFavorite();
            return;
        }

        setOnRequest(true);

        const body = {
            mediaId: media.id,
            mediaTitle: media.title || media.name,
            mediaType: mediaType,
            mediaPoster: media.poster_path,
            mediaRate: media.vote_average
        };

        const { response, err } = await favoriteApi.add(body);

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            dispatch(addFavorite(response));
            setIsFavorite(true);
            toast.success("Add favorite success");
        }
    };

    const onRemoveFavorite = async () => {
        if (onRequest) return;
        setOnRequest(true);

        const favorite = listFavorites.find(e => e.mediaId.toString() === media.id.toString());

        const { response, err } = await favoriteApi.remove({ favoriteId: favorite.id });

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            dispatch(removeFavorite(favorite));
            setIsFavorite(false);
            toast.success("Remove favorite success");
        }
    };


    return (
        media ? (
            <>
                {/* <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)} /> */}
                <ImageHeader imgPath={media.image} />
                <Box sx={{
                    color: "primary.contrastText",
                    ...uiConfigs.style.mainContent
                }}>
                    {/* media content */}
                    {selectedEpisode ?
                        (

                            <Box sx={{
                                marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" }
                            }}>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: { md: "row", xs: "column" }
                                }}>
                                    {/* <h1 style={{ width: "100%", border: '1px solid red' }}>Video Player</h1> */}
                                    <VideoPlayer episodeID={media.episodes[selectedEpisode - 1]} />
                                </Box>
                            </Box>
                        ) :


                        <Box sx={{
                            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" }
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: { md: "row", xs: "column" }
                            }}>
                                {/* poster */}
                                <Box sx={{
                                    width: { xs: "70%", sm: "50%", md: "40%" },
                                    margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
                                }}>
                                    <Box sx={{
                                        paddingTop: "140%",
                                        ...uiConfigs.style.backgroundImage(media.image)
                                    }} />
                                </Box>
                                {/* poster */}

                                {/* media info */}
                                <Box sx={{
                                    width: { xs: "100%", md: "60%" },
                                    color: "text.primary"
                                }}>
                                    <Stack spacing={5}>
                                        {/* title */}
                                        <Typography
                                            variant="h4"
                                            fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                                            fontWeight="700"
                                        // sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                                        >
                                            {/* {`${media.title || media.name} ${media.type == tmdbConfigs.mediaType.movie ? media.release_date?.split("-")[0] : media.first_air_date?.split("-")[0]}`} */}
                                            {media.title || media.name}
                                        </Typography>
                                        {/* title */}

                                        {/* rate and genres */}
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {/* rate */}
                                            {/* <CircularRate value={media.vote_average} /> */}
                                            {/* rate */}
                                            <Divider orientation="vertical" />
                                            {/* genres */}
                                            {
                                                media.genres.slice(0, 4).map(genera => (
                                                    <Chip
                                                        key={genera}
                                                        label={genera}
                                                        variant="filled"
                                                        color="primary"
                                                    // key={index}
                                                    />
                                                ))
                                            }
                                            {/* genres */}
                                        </Stack>


                                        <Stack direction="row" spacing={1} alignItems="center">

                                            <Chip
                                                label={`Total Episodes ${media.totalEpisodes}`}
                                                variant="filled"
                                                color="primary"
                                            // key={index}
                                            />

                                        </Stack>

                                        {/* rate and genres */}

                                        {/* overview */}
                                        <Typography
                                            variant="body1"
                                            sx={{ ...uiConfigs.style.typoLines(5) }}
                                        >
                                            {media.description}
                                        </Typography>
                                        {/* overview */}

                                        {/* buttons */}
                                        <Stack direction="row" spacing={1}>
                                            <LoadingButton
                                                variant="text"
                                                sx={{
                                                    width: "max-content",
                                                    "& .MuiButon-starIcon": { marginRight: "0" }
                                                }}
                                                size="large"
                                                startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                                                loadingPosition="start"
                                                loading={onRequest}
                                                onClick={onFavoriteClick}
                                            />
                                            <Button
                                                variant="contained"
                                                sx={{ width: "max-content" }}
                                                size="large"
                                                startIcon={<PlayArrowIcon />}
                                                onClick={() => videoRef.current.scrollIntoView()}
                                            >
                                                watch now
                                            </Button>
                                        </Stack>
                                        {/* buttons */}

                                        {/* cast */}
                                        {/* <Container header="Cast">
                                        <CastSlide casts={media.credits.cast} />
                                    </Container> */}
                                        {/* cast */}
                                    </Stack>
                                </Box>
                                {/* media info */}
                            </Box>
                        </Box>

                    }

                    {/* media content */}

                    {/* media videos */}
                    <div ref={videoRef} style={{ paddingTop: "2rem" }}>
                        {/* <Container header="Videos">
                            <MediaVideosSlide videos={[...media.videos.results].splice(0, 5)} />
                        </Container> */}
                    </div>
                    {/* media videos */}

                    {/* choose server */}
                    <div>

                        <Typography container textAlign="center" fontWeight='lighter' color={'#555556'} spacing={2} marginBottom={2}>If current server doesn&apos;t work please try other servers below.</Typography>
                        <Grid container justifyContent="center" spacing={1}>
                            {["VidCloud", "Streamsb", "VidStreaming", "StreamTape"].map((value) => (
                                <Grid key={value}
                                    sx={{
                                        "cursor": "pointer"
                                    }}
                                    item>
                                    <Typography
                                        variant="body1"

                                        // fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                                        sx={{
                                            // height: 140,
                                            color: "text.primary",
                                            width: 150,
                                            padding: 1,
                                            // justifyContent: 'center',
                                            // alignItems: 'center',

                                            display: 'flex',
                                            backgroundColor: selectedServer === value ? '#f44336' : '',
                                            // background: 'red',
                                            flexDirection: 'column',
                                            border: '1px solid red',
                                            borderRadius: '12px'
                                        }}
                                        onClick={() => handleServerChange(value)}
                                    >
                                        <Typography>
                                            <DnsIcon fontSize='small' />Server
                                        </Typography>

                                        <Typography fontWeight="700" fontSize={{ xs: '16px', md: '16px', lg: "18px" }} >{value}</Typography>
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </div>

                    {/* choose server */}

                    {/* choose episodes */}
                    <Typography variant="h6" sx={{ color: "text.primary", marginTop: '2rem' }}>
                        Episodes:
                    </Typography>
                    {
                        isMobile ? (
                            <List container sx={{ overflow: 'auto', maxHeight: 250, marginTop: '1rem' }} spacing={3}>
                                {media.episodes.map((episodes) => (
                                    <ListItem key={episodes.number} sx={{
                                        "outline": '1px solid #282828',
                                        "margin": '5px',
                                        width: 'auto',
                                        "padding": '10px',
                                        "borderRadius": '10px',
                                        "&:hover": {
                                            "outline": '1px solid red',
                                        },
                                        "backgroundColor": selectedEpisode === episodes.number ? '#f44336' : '',

                                    }}
                                        onClick={() => setSelectedEpisode(episodes.number)}>
                                        <Typography variant="body1" sx={{ color: "text.primary", }}>
                                            Episode {episodes.number}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (

                            <Grid container style={{ justifyContent: 'center' }}>
                                {
                                    media.episodes.map(episodes => (
                                        <Grid item xs={3} key={episodes.number}>
                                            <Box sx={{
                                                "outline": '1px solid #282828',
                                                "margin": '5px',
                                                "padding": '10px',
                                                "borderRadius": '10px',
                                                "&:hover": {
                                                    "outline": '1px solid red',
                                                },
                                                "backgroundColor": selectedEpisode === episodes.number ? '#f44336' : '',
                                            }}
                                                onClick={() => setSelectedEpisode(episodes.number)}>
                                                <Typography variant="body1" sx={{ color: "text.primary", }}>
                                                    Episode {episodes.number}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))
                                }

                            </Grid>

                        )
                    }



                    {/* media backdrop */}

                    {/* {media.images.backdrops.length > 0 && (
                        <Container header="backdrops">
                            <BackdropSlide backdrops={media.images.backdrops} />
                        </Container>
                    )} */}
                    {/* media backdrop */}

                    {/* media posters */}
                    {/* {media.images.posters.length > 0 && (
                        <Container header="posters">
                            <PosterSlide posters={media.images.posters} />
                        </Container>
                    )} */}
                    {/* media posters */}

                    {/* media reviews */}
                    {/* <MediaReview reviews={media.reviews} media={media} mediaType={mediaType} /> */}
                    {/* media reviews */}

                    {/* media recommendation */}
                    {/* <Container header="you may also like">
                        {media.recommend.length > 0 && (
                            <RecommendSlide medias={media.recommend} mediaType={mediaType} />
                        )}
                        {media.recommend.length === 0 && (
                            <MediaSlide
                                mediaType={mediaType}
                                mediaCategory={tmdbConfigs.mediaCategory.top_rated}
                            />
                        )}
                    </Container> */}
                    {/* media recommendation */}
                </Box >
            </>
        ) : null
    )
}

