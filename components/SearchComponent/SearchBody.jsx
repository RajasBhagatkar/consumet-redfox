import React from 'react'
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, Stack, TextField, Toolbar } from "@mui/material";
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
                    <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        sx={{ width: "100%" }}
                    >
                        {/* this is mediaTypes like movie, tv, series */}
                        {/* {mediaTypes.map((item, index) => (
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
                        ))} */}
                    </Stack>
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
                </Stack>
            </Box>
        </>
    )
}
