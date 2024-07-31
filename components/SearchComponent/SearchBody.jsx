import React from 'react'
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
// import mediaApi from "../api/modules/media.api";
import MediaGrid from './MediaGrid';
import uiConfigs from '@/configs/ui.configs';
import axios from '@/api/axios';
import Link from 'next/link';



const mediaTypes = ["movie", "tv", "people"];
let timer;
const timeout = 500;

export default function SearchBody() {

    const [query, setQuery] = useState("");
    const [onSearchLoading, setOnSearchLoading] = useState(false);
    const [mediaType, setMediaType] = useState(mediaTypes[0]);
    const [medias, setMedias] = useState([]);
    const [page, setPage] = useState(1);

    const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

    const search = useCallback(async (pageNumber) => {
        try {
            setOnSearchLoading(true);

            const { data } = await axios.get(`/${query}?page=1`);

            setOnSearchLoading(false);

            if (data) {
                if (page > 1) setMedias(m => [...m, ...data.results]);
                else setMedias([...data.results]);
            }
        } catch (err) {
            if (err) toast.error(err.message);
        }
    },
        [mediaType, query, page],
    );


    // useEffect(() => {
    //     if (query.trim().length === 0) {
    //         setMedias([]);
    //         setPage(1);
    //     } else search();
    // }, [search, query, mediaType, page]);


    const onQueryChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
    };
    return (
        <>

            <Toolbar />
            <Box sx={{ ...uiConfigs.style.mainContent }}>
                <Stack spacing={2}>
                    {/* <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        sx={{ width: "100%" }}
                    >
                        {mediaTypes.map((item, index) => (
                            <Button
                                size="large"
                                key={index}
                                variant={mediaType === item ? "contained" : "text"}
                                sx={{
                                    color: mediaType === item ? "primary.contrastText" : "text.primary"
                                }}
                                onClick={() => onCategoryChange(item)}
                            >
                                {item}
                            </Button>
                        ))}
                    </Stack> */}
                    {/* searchbox input  */}
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        search(1);
                    }}
                    >

                        <Box
                            display={"flex"}
                            position={"relative"}
                        >
                            <TextField
                                color="success"
                                placeholder="Search MoonFlix"
                                sx={{ width: "100%" }}
                                autoFocus
                                onChange={onQueryChange}
                            />


                            <Box
                                position={"absolute"}
                                alignSelf={"center"}
                                right={'10px'}
                            >

                                <Button
                                    variant="outlined"
                                    onClick={() => search(1)}
                                >
                                    Search
                                </Button>
                            </Box>
                        </Box>
                    </form>


                    {/* this is showing all the movies if present */}
                    <MediaGrid medias={medias} mediaType={mediaType} />

                    {medias.length > 0 && (
                        <LoadingButton
                            loading={onSearchLoading}
                            onClick={() => setPage(page + 1)}
                        >
                            load more
                        </LoadingButton>
                    )}
                    {
                        medias.length <= 0 && <WebsiteInfo />
                    }
                </Stack>
            </Box>
        </>
    )
}


function WebsiteInfo() {
    return (
        <Box component={"section"} sx={{}} style={{ marginTop: "4rem", marginLeft: "0px" }}>
            <Box component={"section"} mb={3} letterSpacing={".3px"}>
                <Typography variant='p' >
                    <div style={{ marginBottom: "5px" }}>
                        <b >Watch Movies Online Free</b>
                    </div>
                    <span>
                        Watching free movies online is a convenient and frugal way to enjoy your favorite movies and TV shows right from the comfort of your own home. Instead of paying about ten bucks for a movie ticket or a monthly subscription plan to paid streaming services, you can watch almost any movie or show on a movie site at no cost. There are thousands of sites that let you watch movies for free, but only a few sites are safe and high quality. A completely safe site is one free from ads, pop ups, and commercials as ad links might carry viruses and malware. And RedFox is such a site. Put away all of your worries, your overall experience on our site will be nothing but joy, safety, and satisfaction.
                    </span>
                </Typography>
            </Box>

            <Box component={"section"} mb={3} letterSpacing={".2px"}>
                <Typography variant='p'>
                    <div style={{ marginBottom: "5px" }}>
                        <b >What is RedFox?</b>
                    </div>
                    <span>
                        RedFox has joined the movie streaming industry recently. Although we are the new kid on the block, we have spent years doing extensive research about movie fans expectations for an ideal movie site. Our ultimate goal is to create the best site ever for the community. RedFox does not only provide you with a safe and secure experience, it also offers you premium quality content and features that normally cost you ten bucks a month elsewhere. On RedFox, you can enjoy thousands of movies and TV shows in HD quality with multiple subtitles. Your streaming experience will be smooth and seamless with no lagging, buffering, or pop ups. RedFox also provides 24/7 customer service to make sure your overall experience will be completely hassle-free.
                    </span>
                </Typography>
            </Box>

            <Box component={"section"} mb={3} letterSpacing={".2px"}>

                <Typography variant='p'>
                    <div style={{ marginBottom: "5px" }}>
                        <b >Is It Illegal to Use RedFox?</b>
                    </div>
                    <span>
                        Although RedFox is not a legal site, using it for free movie streaming should not cause you any problem. According to copyright attorneys, you are only subject to criminal or civil charges if you commit illegal downloading or file sharing. Therefore, stick with online movie streaming only or use a VPN to stay anonymous in case you insist on downloading.
                    </span>
                </Typography>
            </Box>


            <Box component={"section"} mb={3} letterSpacing={".2px"}>
                <Typography variant='p'>
                    <div style={{ marginBottom: "5px" }}>
                        <b >Is RedFox Safe?</b>
                    </div>
                    <span>
                        Security is one of the biggest reasons people say no to free movie sites. Many movie fans are willing to pay, as they want a worry-free watching experience that they think only premium sites could offer. If you are one of them, good news for you that you can start saving your money. RedFox is completely safe thanks to the ad-free feature and the no registration policy. With no ads, the site poses no risk to your device and identity. You are safe from common Internet risks such as data loss, identity theft, and corrupted networks. And with no information required for registration, you are also safe from information leakage. It is totally not exaggerating to say RedFox is one of the best and safest free movie sites you can find on the Internet.
                    </span>
                </Typography>
            </Box>


            <Box component={"section"} mb={3} letterSpacing={".2px"}>
                <Typography variant='p'>
                    <div style={{ marginBottom: "5px" }}>
                        <b >How To Download From RedFox?</b>
                    </div>
                    <span>
                        Before downloading your video of choice, be aware of possible problems you might face for illegal downloading that we stated above. If you still insist on downloading, please proceed at your own risk. After turning on a VPN, go to play the movie or TV show of interest, click on the Download Button, and wait for it to finish downloading.
                    </span>
                </Typography>
            </Box>

            <Box component={"section"} mb={3} letterSpacing={".2px"}>
                <Typography variant='p'>
                    <div style={{ marginBottom: "5px" }}>
                        <b >Why Should You Watch Movies and TV Shows Online for Free on RedFox?</b>
                    </div>
                    <span>
                        Because nothing can be better than watching your favorite movies safely, freely, and seamlessly after a long day. And only a few sites can provide you with such an experience. Here is our feature list to prove that RedFox is the best choice for your movie night.
                    </span>
                    <span>
                        {/* <ul>
                            <li>Extensive content library: With over 30,000 titles including both movies and TV shows, we are confident to provide you with whatever movies you have been longing for.</li>
                            <li>HD Resolution: Once you go HD, you cannot go back. It is simply the truth. Why suffer from blurry images when you can have high definition quality (720p) at RedFox? In case your Internet connection is not stable, you can adjust the video quality for a smoother streaming experience.</li>
                            <li>Seamless streaming experience: Expect the smoothest watching experience ever on RedFox as we have fast loading speed, seamless streaming feature, and especially, no ads.</li>
                            <li>Daily database updates: Our database is updated on a daily basis with the latest releases, requested titles, and random hidden gems that not many know about. Check out the site frequently in order not to miss out on any fun.</li>
                            <li>Friendly user interface: No matter how long you have been familiar with movie sites, you will figure out how to navigate and browse through RedFox at first glance. If you have a title in mind, head to the search bar. If not, simply use the site’s filter system and suggestions.</li>
                            <li>Mobile-friendly and Chromecast supported: With these two features, you can continue watching your movies or TV shows anytime, anywhere, with any device available, as long as it is Internet enabled.</li>
                            <li>Zero ads: Ads are safe and enjoyable, says no movie fan ever! Ads can be risky and annoying, therefore, you should stay away from them whenever the opportunity is given. And they are nonexistent on RedFox, so why put your device at risk on other sites?</li>
                            <li>No account or registration needed: Your user experience on RedFox is completely hassle-free. You can visit us whenever you are in the mood, search for your movie of interest, enjoy it, and leave as you please. There is no registration or signup required at all.</li>
                            <li>Best customer service: Our team is at your service 24/7 to assist you with any problems while using the site. If you have any request or inquiry, feel free to send us a message.</li>
                        </ul> */}
                        <em>
                            - Extensive content library: With over 30,000 titles including both movies and
                            TV shows, we are confident to provide you with whatever movies you have been
                            longing for.
                            <br />
                            - HD Resolution: Once you go HD, you cannot go back. It is simply the truth.
                            Why suffer from blurry images when you can have high definition quality (720p)
                            at RedFox? In case your Internet connection is not stable, you can adjust the
                            video quality for a smoother streaming experience.
                            <br />
                            - Seamless streaming experience: Expect the smoothest watching experience ever
                            on RedFox as we have fast loading speed, seamless streaming feature, and
                            especially, no ads.
                            <br />
                            - Daily database updates: Our database is updated on a daily basis with the
                            latest releases, requested titles, and random hidden gems that not many know
                            about. Check out the site frequently in order not to miss out on any
                            fun.
                            <br />
                            - Friendly user interface: No matter how long you have been familiar with
                            movie sites, you will figure out how to navigate and browse through RedFox at
                            first glance. If you have a title in mind, head to the search bar. If not,
                            simply use the sites filter system and suggestions.
                            <br />
                            - Mobile-friendly and Chromecast supported: With these two features, you can
                            continue watching your movies or TV shows anytime, anywhere, with any device
                            available, as long as it is Internet enabled.
                            <br />
                            - Zero ads: Ads are safe and enjoyable, says no movie fan ever! Ads can be
                            risky and annoying, therefore, you should stay away from them whenever the
                            opportunity is given. And they are nonexistent on RedFox, so why put your
                            device at risk on other sites?
                            <br />
                            - No account or registration needed: Your user experience on RedFox is
                            completely hassle-free. You can visit us whenever you are in the mood, search
                            for your movie of interest, enjoy it, and leave as you please. There is no
                            registration or signup required at all.
                            <br />- Best customer service: Our team is at your service 24/7 to assist you
                            with any problems while using the site. If you have any request or inquiry,
                            feel free to send us a message.
                        </em>

                    </span>
                </Typography>
            </Box>
        </Box>
    )
}