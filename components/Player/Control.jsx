import useMobileSize from '@/hooks/useMobileSize';
import { FastForward, FastRewind, Fullscreen, Pause, PlayArrow, SkipNext, VolumeDown, VolumeOff, VolumeUp } from '@mui/icons-material'
import { Box, Button, CircularProgress, Grid, Popover, Slider, Tooltip } from '@mui/material'
import React from 'react'


const Control = ({ buffer, onPlayPause, playing, onRewind, onForward, played, onSeek, onSeekMouseUp, onVolumeChangeHandler, onVolumeSeekUp, volume, mute, onMute, duration, currentTime, onMouseSeekDown, controlRef, episodeInfo }) => {

    const mobile = useMobileSize();
    return (
        <div className="control_Container" ref={controlRef}>
            <div className="top_container">
                <h2>Ep{episodeInfo?.number}</h2>
            </div>
            <div className="mid__container">
                {buffer ?
                    (
                        <div className="icon__btn" >
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        </div>
                    ) :
                    <>
                        <div className="icon__btn" onDoubleClick={onRewind}>
                            <FastRewind fontSize="medium" />
                        </div>

                        <div className="icon__btn" onClick={onPlayPause}>
                            {playing ? (
                                <Pause fontSize="medium" />
                            ) : (
                                <PlayArrow fontSize="medium" />
                            )}{" "}
                        </div>

                        <div className="icon__btn">
                            <FastForward fontSize="medium" onDoubleClick={onForward} />
                        </div>
                    </>

                }
            </div>
            <div className="bottom__container">
                <div className="slider__container">
                    {/* <PrettoSlider
                        min={0}
                        max={100}
                        value={played * 100}
                        onChange={onSeek}
                        onChangeCommitted={onSeekMouseUp}
                        onMouseDown={onMouseSeekDown}
                    /> */}
                    <Slider
                        aria-label="time-indicator"
                        sx={{
                            root: {
                                height: "20px",
                                color: "#9556CC",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            },
                            thumb: {
                                height: 20,
                                width: 20,
                                backgroundColor: "#9556CC",
                                border: "2px solid currentColor",
                                marginTop: -3,
                                marginLeft: -12,
                                "&:focus, &:hover, &.Mui-active": {
                                    boxShadow: "inherit",
                                },
                            },
                            valueLabel: {
                                left: "calc(-50% + 4px)",
                            },
                            track: {
                                height: 5,
                                borderRadius: 4,
                                width: "100%",
                            },
                            rail: {
                                height: 5,
                                borderRadius: 4,
                            },
                            // from mi/ui website
                            height: 4,
                            '& .MuiSlider-thumb': {
                                width: 8,
                                height: 8,
                                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                '&:before': {
                                    boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                },

                                '&.Mui-active': {
                                    width: 20,
                                    height: 20,
                                },
                            },
                            '& .MuiSlider-rail': {
                                opacity: 0.28,
                            },
                        }
                        }
                        min={0}
                        max={100}
                        value={played * 100}
                        onChange={onSeek}
                        onChangeCommitted={onSeekMouseUp}
                        onMouseDown={onMouseSeekDown}
                    />


                </div>
                <div className="control__box">
                    <div className="inner__controls">
                        <div className="icon__btn" onClick={onPlayPause}>
                            {playing ? (
                                <Pause fontSize="medium" />
                            ) : (
                                <PlayArrow fontSize="medium" />
                            )}{" "}
                        </div>

                        <div className="icon__btn">
                            <SkipNext fontSize="medium" />
                        </div>

                        <div className="icon__btn" onClick={onMute}>
                            {mute ? (
                                <VolumeOff fontSize="medium" />
                            ) : (
                                <VolumeUp fontSize="medium" />
                            )}
                        </div>

                        <Slider
                            sx={{
                                width: mobile ? "70px" : "100px",
                                color: 'red'
                            }}
                            size="small"
                            onChange={onVolumeChangeHandler}
                            value={volume * 100}
                            onChangeCommitted={onVolumeSeekUp}
                        />

                        <span>{currentTime} : {duration}</span>
                    </div>
                    <div className="icon__btn" style={{ cursor: "pointer", paddingRight: "10px" }}>
                        <Fullscreen sx={{
                            '&:hover': {
                                width: 30,
                                height: 30,
                            },
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Control;
