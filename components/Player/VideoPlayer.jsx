import { Container } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import Control from './Control'
import { formatTime } from '@/utils/format'
import getStremingURL from '@/hooks/getStremingURL'
import { findDOMNode } from 'react-dom'
import useMobileSize from '@/hooks/useMobileSize'

let count = 0;

const VideoPlayer = ({ episodeID }) => {

    const mobile = useMobileSize()

    // const { data } = getStremingURL("one-punch-man-63$episode$1501$both")
    const player = useRef(null);
    const videoPlayerRef = useRef(null);
    const controlRef = useRef(null);

    const [videoState, setVideoState] = useState({
        playing: true,
        muted: false,
        volume: 0.5,
        playbackRate: 1.0,
        played: 0,
        seeking: false,
        buffer: true,
    });

    const [videoURL, setvideoURL] = useState("");

    //Destructuring the properties from the videoState
    const { playing, muted, volume, playbackRate, played, seeking, buffer } =
        videoState;

    const currentTime = videoPlayerRef.current
        ? videoPlayerRef.current.getCurrentTime()
        : "00:00";
    const duration = videoPlayerRef.current
        ? videoPlayerRef.current.getDuration()
        : "00:00";

    const formatCurrentTime = formatTime(currentTime);
    const formatDuration = formatTime(duration);

    const playPauseHandler = () => {
        //plays and pause the video (toggling)
        setVideoState({ ...videoState, playing: !videoState.playing });
    };

    const rewindHandler = () => {
        //Rewinds the video player reducing 5
        videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
    };

    const handleFastFoward = () => {
        //FastFowards the video player by adding 10
        videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
    };

    //console.log("========", (controlRef.current.style.visibility = "false"));
    const progressHandler = (state) => {
        if (count > 3) {
            console.log("close");
            controlRef.current.style.visibility = "hidden"; // toggling player control container
        } else if (controlRef.current.style.visibility === "visible") {
            count += 1;
        }

        if (!seeking) {
            setVideoState({ ...videoState, ...state });
        }
    };

    const seekHandler = (e, value) => {
        setVideoState({ ...videoState, played: parseFloat(value / 100) });
        videoPlayerRef.current.seekTo(parseFloat(value / 100));
    };

    const seekMouseUpHandler = (e, value) => {
        console.log(value);

        setVideoState({ ...videoState, seeking: false });
        videoPlayerRef.current.seekTo(value / 100);
    };

    const volumeChangeHandler = (e, value) => {
        const newVolume = parseFloat(value) / 100;

        setVideoState({
            ...videoState,
            volume: newVolume,
            muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
        });
    };

    const volumeSeekUpHandler = (e, value) => {
        const newVolume = parseFloat(value) / 100;

        setVideoState({
            ...videoState,
            volume: newVolume,
            muted: newVolume === 0 ? true : false,
        });
    };

    const muteHandler = () => {
        //Mutes the video player
        setVideoState({ ...videoState, muted: !videoState.muted });
    };

    const onSeekMouseDownHandler = (e) => {
        setVideoState({ ...videoState, seeking: true });
    };

    const mouseMoveHandler = () => {
        controlRef.current.style.visibility = "visible";
        count = 0;
    };

    const bufferStartHandler = () => {
        console.log("Bufering.......");
        setVideoState({ ...videoState, buffer: true });
    };

    const bufferEndHandler = () => {
        console.log("buffering stoped ,,,,,,play");
        setVideoState({ ...videoState, buffer: false });
    };

    const { data, isLoading, error } = getStremingURL(episodeID.id)
    console.log(data)

    useEffect(() => {
        // Function to execute when spacebar is pressed
        const handleSpacebarPress = (event) => {
            event.preventDefault();
            if (event.code === 'Space') {
                setVideoState(prev => ({
                    ...prev,
                    playing: !prev.playing

                }))
            }
            else if (event.code === "ArrowRight") {
                handleFastFoward()
            }
            else if (event.code === "ArrowLeft") {
                rewindHandler()
            }
            else if (event.code == "keyF" || event.keyCode === 70) {
                // console.log(document.fullscreenElement)
                player.current.requestFullscreen();
                console.log(document.fullscreenelement)

            }

        };

        // Add event listener
        window.addEventListener('keydown', handleSpacebarPress);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('keydown', handleSpacebarPress);
        };
    }, []);
    return (
        <div className="video_container" >
            {/* <div>
                <h2>React player</h2>
            </div> */}
            {/* maxWidth="md" */}
            <Container justify="center">
                <div className="player__wrapper" onMouseMove={mouseMoveHandler} style={{ minHeight: mobile ? "" : "600px", marginBottom: mobile && "10rem" }} ref={player}>
                    <ReactPlayer
                        ref={videoPlayerRef}
                        className="player"
                        // url="https://bucket-viewer.s3.amazonaws.com/viewer1664370329252.mp4"
                        url={data?.sources[1]['url']}
                        width="100%"
                        height="100%"
                        playing={playing}
                        volume={volume}
                        muted={muted}
                        onProgress={progressHandler}
                        onBuffer={bufferStartHandler}
                        onBufferEnd={bufferEndHandler}

                    />

                    {/* {buffer && <p>Loading</p>} */}

                    <Control
                        buffer={buffer}
                        controlRef={controlRef}
                        onPlayPause={playPauseHandler}
                        playing={playing}
                        onRewind={rewindHandler}
                        onForward={handleFastFoward}
                        played={played}
                        onSeek={seekHandler}
                        onSeekMouseUp={seekMouseUpHandler}
                        volume={volume}
                        onVolumeChangeHandler={volumeChangeHandler}
                        onVolumeSeekUp={volumeSeekUpHandler}
                        mute={muted}
                        onMute={muteHandler}
                        playRate={playbackRate}
                        duration={formatDuration}
                        currentTime={formatCurrentTime}
                        onMouseSeekDown={onSeekMouseDownHandler}
                        episodeInfo={episodeID}
                    />
                </div>
            </Container>
        </div>
    );
}

export default VideoPlayer