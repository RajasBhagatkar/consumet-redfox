import React from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Divider, Grid, List, ListItem, Paper, Stack, Typography, useMediaQuery, } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// import CircularRate from '../HomePage/CircularRate';
// import Container from '../layoutComponents/Container';
import ImageHeader from './ImageHeader';


import uiConfigs from '@/configs/ui.configs';
// import tmdbConfigs from '@/configs/tmdb.configs';
// mediaAPI
// favoriteApi

import { setAuthModalOpen } from '@/redux/features/authModalSlice';
import { addFavorite, removeFavorite } from '@/redux/features/userSlice';

// import { setGlobalLoading } from '@/redux/features/globalLoadingSlice';
// import CastSlide from './CastSlide';
// import MediaVideosSlide from './MediaVideosSlide';
// import BackdropSlide from './BackdropSlide';
// import PosterSlide from './PosterSlide';
// import RecommendSlide from './RecommendSlide';
// import MediaSlide from './MediaSlide';
// import { data } from 'autoprefixer';
// import MediaReview from './MediaReview';
import DnsIcon from '@mui/icons-material/Dns';
import { useTheme } from '@emotion/react';
import VideoPlayer from '../Player/VideoPlayer';
import useMobileSize from '@/hooks/useMobileSize';
import fetcher from '@/api/fetcher';
import useSwr from 'swr'
import axios from '@/api/axios';
// MediaReview

export default function MovieDetails({ id, movieInfo, availableServers }) {

    const { user, listFavorites } = useSelector((state) => state.user);

    const mobile = useMobileSize();

    const [isFavorite, setIsFavorite] = useState(false);
    const [onRequest, setOnRequest] = useState(false);

    const dispatch = useDispatch();

    const videoRef = useRef(null);

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [selectedServer, setSelectedServer] = useState(availableServers[0]);

    const [selectedEpisode, setSelectedEpisode] = useState({
        episodeNumber: 1,
        allServerLinks: availableServers,
        isPlaying: false
    });

    const handleServerChange = (value) => {
        setSelectedServer(value);
    }

    useEffect(() => {
        console.log(selectedEpisode)
    }, [selectedEpisode])


    //     window.scrollTo(0, 0);

    async function handleChangeEpisode(episodeInfo) {
        // {"id":"shingeki-no-kyojin-dub-episode-2","number":2,"url":"https://anitaku.pe//shingeki-no-kyojin-dub-episode-2"}

        try {

            setSelectedEpisode(prev => ({
                ...prev,
                episodeNumber: episodeInfo.number,
            }))
            const response = await axios.get(`/servers/${episodeInfo.id}`)
            // alert(JSON.stringify(response.data))
            setSelectedEpisode(prev => ({
                ...prev,
                isPlaying: true,
                episodeNumber: episodeInfo.number,
                allServerLinks: response.data
            }))

            // alert(JSON.stringify(data))
        } catch (e) {
            // alert(JSON.stringify(e.response.data))
            toast.error(e.response.data)
        }



    }

    function startPlayingVideo() {
        setSelectedEpisode(prev => ({
            ...prev,
            isPlaying: true
        }))
    }

    const onFavoriteClick = async () => {
        if (!user) return dispatch(setAuthModalOpen(true));

        if (onRequest) return;

        if (isFavorite) {
            onRemoveFavorite();
            return;
        }

        setOnRequest(true);

        const body = {
            mediaId: movieInfo.id,
            mediaTitle: movieInfo.title || movieInfo.name,
            genres: [...movieInfo.genres],
            mediaPoster: movieInfo.poster_path,
            mediaRate: movieInfo.vote_average
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

        const favorite = listFavorites.find(e => e.mediaId.toString() === movieInfo.id.toString());

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
        movieInfo ? (
            <>
                {/* <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)} /> */}
                <ImageHeader imgPath={movieInfo.image} />
                <Box sx={{
                    color: "primary.contrastText",
                    ...uiConfigs.style.mainContent
                }}>
                    {/* media content */}

                    {
                        selectedEpisode.isPlaying ?
                            // JSON.stringify(selectedEpisode.allServerLinks.find(server => server.name === selectedServer.name).url)

                            <Box sx={{
                                marginTop: { xs: "-10rem", md: "-15rem", lg: "-30rem" }
                            }}>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: { md: "row", xs: "column" }
                                }}>
                                    {/* <h1 style={{ width: "100%", border: '1px solid red' }}>Video Player</h1> */}
                                    <div className="video_container" style={{ overflow: "hidden", outline: "1px solid black" }}>
                                        <div className="player__wrapper" style={{ minHeight: mobile ? "" : "600px", marginBottom: mobile && "1rem", width: "100%", height: "100%", outline: "0px solid white" }}>
                                            <iframe allow="autoplay" className='player' height={"100%"} width={"100%"} src={selectedEpisode.allServerLinks.find(server => server.name === selectedServer.name).url + "?autoplay=1"} frameborder="0" allowfullscreen="true"></iframe>
                                        </div>
                                    </div>
                                </Box>
                            </Box>
                            :
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
                                            ...uiConfigs.style.backgroundImage(movieInfo.image)
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
                                                {movieInfo.title || movieInfo.name}
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
                                                    movieInfo.genres.map(genera => (
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
                                                    label={`Total Episodes ${movieInfo.totalEpisodes}`}
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
                                                {movieInfo.description}
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
                                                    // onClick={() => videoRef.current.scrollIntoView()}
                                                    onClick={startPlayingVideo}
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
                        {/* server info */}
                        <Grid container justifyContent="center" spacing={1}>
                            {availableServers?.map((value) => (
                                <Grid key={value.name}
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
                                            backgroundColor: selectedServer.name === value.name ? '#f44336' : '',
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

                                        <Typography fontWeight="700" fontSize={{ xs: '16px', md: '16px', lg: "18px" }} >{value.name}</Typography>
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
                                {movieInfo.episodes.map((episodes) => (
                                    <ListItem key={episodes.number} sx={{
                                        "outline": '1px solid #282828',
                                        "margin": '5px',
                                        width: 'auto',
                                        "padding": '10px',
                                        "borderRadius": '10px',
                                        "&:hover": {
                                            "outline": '1px solid red',
                                        },
                                        "backgroundColor": selectedEpisode.episodeNumber === episodes.number ? '#f44336' : '',

                                    }}
                                        onClick={() => handleChangeEpisode(episodes)}>
                                        <Typography variant="body1" sx={{ color: "text.primary", }}>
                                            Episode {episodes.number}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (

                            <Grid container style={{ justifyContent: 'center' }}>
                                {
                                    movieInfo.episodes.map(episodes => (
                                        <Grid item xs={3} key={episodes.number}>
                                            <Box sx={{
                                                "outline": '1px solid #282828',
                                                "margin": '5px',
                                                "padding": '10px',
                                                "borderRadius": '10px',
                                                "&:hover": {
                                                    "outline": '1px solid red',
                                                },
                                                "backgroundColor": selectedEpisode.episodeNumber === episodes.number ? '#f44336' : '',
                                            }}
                                                onClick={() => handleChangeEpisode(episodes)}
                                            >
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

