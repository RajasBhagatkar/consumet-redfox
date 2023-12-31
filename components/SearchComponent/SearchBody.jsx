import React from 'react'
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
// import mediaApi from "../api/modules/media.api";
import MediaGrid from './MediaGrid';
import uiConfigs from '@/configs/ui.configs';
import axios from 'axios';
import getMovies from '@/hooks/getMovies';



const mediaTypes = ["movie", "tv", "people"];
let timer;
const timeout = 500;

export default function SearchBody() {

    const [query, setQuery] = useState("");
    const [onSearch, setOnSearch] = useState(false);
    const [mediaType, setMediaType] = useState(mediaTypes[0]);
    const [medias, setMedias] = useState([]);
    const [page, setPage] = useState(1);

    const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

    const search = useCallback(async () => {
        try {
            setOnSearch(true);

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${query}?page=1`);
            console.log(data.results)

            setOnSearch(false);

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


    useEffect(() => {
        if (query.trim().length === 0) {
            setMedias([]);
            setPage(1);
        } else search();
    }, [search, query, mediaType, page]);


    const onQueryChange = (e) => {
        const newQuery = e.target.value;
        clearTimeout(timer);

        timer = setTimeout(() => {
            setQuery(newQuery);
        }, timeout);
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
                    </Stack>
                    {/* searchbox input  */}
                    <TextField
                        color="success"
                        placeholder="Search MoonFlix"
                        sx={{ width: "100%" }}
                        autoFocus
                        onChange={onQueryChange}
                    />
                    {/* this is showing all the movies if present */}
                    <MediaGrid medias={medias} mediaType={mediaType} />

                    {medias.length > 0 && (
                        <LoadingButton
                            loading={onSearch}
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
