import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import uiConfigs from "../../configs/ui.configs";
import CircularRate from "./CircularRate";
import tmdbConfigs from "@/configs/tmdb.configs";
import Link from "next/link";
import axios from "axios";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  console.log({ mediaType, mediaCategory })

  const [movies, setMovies] = useState([
    {
      "adult": false,
      "backdrop_path": "/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
      "genre_ids": [
        27,
        9648
      ],
      "id": 507089,
      "original_language": "en",
      "original_title": "Five Nights at Freddy's",
      "overview": "Recently fired and desperate for work, a troubled young man named Mike agrees to take a position as a night security guard at an abandoned theme restaurant: Freddy Fazbear's Pizzeria. But he soon discovers that nothing at Freddy's is what it seems.",
      "popularity": 3635.108,
      "poster_path": "/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg",
      "release_date": "2023-10-25",
      "title": "Five Nights at Freddy's",
      "video": false,
      "vote_average": 8.583,
      "vote_count": 569
    },
    {
      "adult": false,
      "backdrop_path": "/wl4NWiZwpzZH67HiDgpDImLyds9.jpg",
      "genre_ids": [
        28,
        12,
        53
      ],
      "id": 299054,
      "original_language": "en",
      "original_title": "Expend4bles",
      "overview": "Armed with every weapon they can get their hands on and the skills to use them, The Expendables are the world’s last line of defense and the team that gets called when all other options are off the table. But new team members with new styles and tactics are going to give “new blood” a whole new meaning.",
      "popularity": 2741.244,
      "poster_path": "/iwsMu0ehRPbtaSxqiaUDQB9qMWT.jpg",
      "release_date": "2023-09-15",
      "title": "Expend4bles",
      "video": false,
      "vote_average": 6.423,
      "vote_count": 479
    },
    {
      "adult": false,
      "backdrop_path": "/x1ZKRyvB7QAXfYVgf5mUJzjPqfH.jpg",
      "genre_ids": [
        28,
        53
      ],
      "id": 575264,
      "original_language": "en",
      "original_title": "Mission: Impossible - Dead Reckoning Part One",
      "overview": "Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the world's fate at stake and dark forces from Ethan's past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan must consider that nothing can matter more than his mission—not even the lives of those he cares about most.",
      "popularity": 2229.436,
      "poster_path": "/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
      "release_date": "2023-07-08",
      "title": "Mission: Impossible - Dead Reckoning Part One",
      "video": false,
      "vote_average": 7.727,
      "vote_count": 1915
    },
    {
      "adult": false,
      "backdrop_path": "/tC78Pck2YCsUAtEdZwuHYUFYtOj.jpg",
      "genre_ids": [
        28,
        53,
        80
      ],
      "id": 926393,
      "original_language": "en",
      "original_title": "The Equalizer 3",
      "overview": "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia.",
      "popularity": 2546.535,
      "poster_path": "/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg",
      "release_date": "2023-08-30",
      "title": "The Equalizer 3",
      "video": false,
      "vote_average": 7.318,
      "vote_count": 1145
    },
    {
      "adult": false,
      "backdrop_path": "/azD31DjpV3PJfjF3h72LVw2WCSD.jpg",
      "genre_ids": [
        27
      ],
      "id": 807172,
      "original_language": "en",
      "original_title": "The Exorcist: Believer",
      "overview": "When his daughter and her friend show signs of demonic possession, it unleashes a chain of events that forces single father, Victor Fielding, to confront the nadir of evil. Terrified and desperate, he seeks out the only person alive who's witnessed anything like it before.",
      "popularity": 1181.232,
      "poster_path": "/qVKirUdmoex8SdfUk8WDDWwrcCh.jpg",
      "release_date": "2023-10-04",
      "title": "The Exorcist: Believer",
      "video": false,
      "vote_average": 5.995,
      "vote_count": 274
    },
    {
      "adult": false,
      "backdrop_path": "/dZbLqRjjiiNCpTYzhzL2NMvz4J0.jpg",
      "genre_ids": [
        27,
        53
      ],
      "id": 951491,
      "original_language": "en",
      "original_title": "Saw X",
      "overview": "Between the events of 'Saw' and 'Saw II', a sick and desperate John Kramer travels to Mexico for a risky and experimental medical procedure in hopes of a miracle cure for his cancer, only to discover the entire operation is a scam to defraud the most vulnerable. Armed with a newfound purpose, the infamous serial killer returns to his work, turning the tables on the con artists in his signature visceral way through devious, deranged, and ingenious traps.",
      "popularity": 1261.823,
      "poster_path": "/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
      "release_date": "2023-09-26",
      "title": "Saw X",
      "video": false,
      "vote_average": 7.304,
      "vote_count": 491
    },
    {
      "adult": false,
      "backdrop_path": "/mRGmNnh6pBAGGp6fMBMwI8iTBUO.jpg",
      "genre_ids": [
        27,
        9648,
        53
      ],
      "id": 968051,
      "original_language": "en",
      "original_title": "The Nun II",
      "overview": "In 1956 France, a priest is violently murdered, and Sister Irene begins to investigate. She once again comes face-to-face with a powerful evil.",
      "popularity": 1331.357,
      "poster_path": "/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg",
      "release_date": "2023-09-06",
      "title": "The Nun II",
      "video": false,
      "vote_average": 6.967,
      "vote_count": 1155
    },
    {
      "adult": false,
      "backdrop_path": "/S3EIcOUQYxgd3QzjOo2rZJ2MN8.jpg",
      "genre_ids": [
        28,
        18,
        10752
      ],
      "id": 554600,
      "original_language": "hi",
      "original_title": "Uri: The Surgical Strike",
      "overview": "Following the roguish terrorist attacks at Uri Army Base camp in Kashmir, India takes the fight to the enemy, in its most successful covert operation till date with one and only one objective of avenging their fallen heroes.",
      "popularity": 1228.506,
      "poster_path": "/yNySAgpAnWmPpYinim9E0tUzJWG.jpg",
      "release_date": "2019-01-11",
      "title": "Uri: The Surgical Strike",
      "video": false,
      "vote_average": 7.094,
      "vote_count": 244
    },
    {
      "adult": false,
      "backdrop_path": "/pA3vdhadJPxF5GA1uo8OPTiNQDT.jpg",
      "genre_ids": [
        28,
        18
      ],
      "id": 678512,
      "original_language": "en",
      "original_title": "Sound of Freedom",
      "overview": "The story of Tim Ballard, a former US government agent, who quits his job in order to devote his life to rescuing children from global sex traffickers.",
      "popularity": 1551.418,
      "poster_path": "/qA5kPYZA7FkVvqcEfJRoOy4kpHg.jpg",
      "release_date": "2023-07-03",
      "title": "Sound of Freedom",
      "video": false,
      "vote_average": 8.121,
      "vote_count": 1026
    },
    {
      "adult": false,
      "backdrop_path": "/r7DuyYJ0N3cD8bRKsR5Ygq2P7oa.jpg",
      "genre_ids": [
        12,
        28,
        18
      ],
      "id": 980489,
      "original_language": "en",
      "original_title": "Gran Turismo",
      "overview": "The ultimate wish-fulfillment tale of a teenage Gran Turismo player whose gaming skills won him a series of Nissan competitions to become an actual professional racecar driver.",
      "popularity": 1436.813,
      "poster_path": "/51tqzRtKMMZEYUpSYkrUE7v9ehm.jpg",
      "release_date": "2023-08-09",
      "title": "Gran Turismo",
      "video": false,
      "vote_average": 8.065,
      "vote_count": 1196
    },
    {
      "adult": false,
      "backdrop_path": "/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
      "genre_ids": [
        28,
        80,
        53
      ],
      "id": 385687,
      "original_language": "en",
      "original_title": "Fast X",
      "overview": "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
      "popularity": 1419.551,
      "poster_path": "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
      "release_date": "2023-05-17",
      "title": "Fast X",
      "video": false,
      "vote_average": 7.243,
      "vote_count": 4063
    },
    {
      "adult": false,
      "backdrop_path": "/k0VC5O8PrrJRqqDDbHDiDo8qAE0.jpg",
      "genre_ids": [
        16,
        28,
        14
      ],
      "id": 1034062,
      "original_language": "en",
      "original_title": "Mortal Kombat Legends: Cage Match",
      "overview": "In 1980s Hollywood, action star Johnny Cage is looking to become an A-list actor. But when his costar, Jennifer, goes missing from set, Johnny finds himself thrust into a world filled with shadows, danger, and deceit. As he embarks on a bloody journey, Johnny quickly discovers the City of Angels has more than a few devils in its midst.",
      "popularity": 840.319,
      "poster_path": "/1eKWqTHp4OgKdx1QX1O9LxKHr1M.jpg",
      "release_date": "2023-10-17",
      "title": "Mortal Kombat Legends: Cage Match",
      "video": false,
      "vote_average": 7.238,
      "vote_count": 42
    },
    {
      "adult": false,
      "backdrop_path": "/7Q6C4Z2Cr2ZrsXg6WcwWCwL27.jpg",
      "genre_ids": [
        28,
        80,
        18
      ],
      "id": 1157049,
      "original_language": "ja",
      "original_title": "次元大介",
      "overview": "The legendary gunman Daisuke Jigen comes to Japan to have his pistol examined.",
      "popularity": 717.12,
      "poster_path": "/mLae32ipNf56gQdl6s77LjYld9F.jpg",
      "release_date": "2023-10-12",
      "title": "Jigen Daisuke",
      "video": false,
      "vote_average": 6.8,
      "vote_count": 10
    },
    {
      "adult": false,
      "backdrop_path": "/5mzr6JZbrqnqD8rCEvPhuCE5Fw2.jpg",
      "genre_ids": [
        28,
        878,
        27
      ],
      "id": 615656,
      "original_language": "en",
      "original_title": "Meg 2: The Trench",
      "overview": "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
      "popularity": 902.927,
      "poster_path": "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
      "release_date": "2023-08-02",
      "title": "Meg 2: The Trench",
      "video": false,
      "vote_average": 6.8,
      "vote_count": 2349
    },
    {
      "adult": false,
      "backdrop_path": "/h7BoGo4NhckWRiMUCi3Qr8GwBDA.jpg",
      "genre_ids": [
        28,
        80,
        18,
        53
      ],
      "id": 1039690,
      "original_language": "en",
      "original_title": "Desperation Road",
      "overview": "After 11 years in a Mississippi state prison, Russell Gaines struggles to leave his past sins behind him as he returns home to his stoic father, Mitchell. One fateful night he meets Maben, a young mother with nothing but a stolen gun and a murdered police deputy to her name. Desperate and on the run, Russell and Maben must trust one another to escape their own circumstances, before the truths of their intertwined violent past threatens to destroy them.",
      "popularity": 527.22,
      "poster_path": "/tPyj6Gii1HrnzCbJXEF7JdSFkQ8.jpg",
      "release_date": "2023-10-19",
      "title": "Desperation Road",
      "video": false,
      "vote_average": 6.75,
      "vote_count": 12
    },
    {
      "adult": false,
      "backdrop_path": "/H6j5smdpRqP9a8UnhWp6zfl0SC.jpg",
      "genre_ids": [
        28,
        878,
        12
      ],
      "id": 565770,
      "original_language": "en",
      "original_title": "Blue Beetle",
      "overview": "Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab.",
      "popularity": 822.711,
      "poster_path": "/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
      "release_date": "2023-08-16",
      "title": "Blue Beetle",
      "video": false,
      "vote_average": 7.052,
      "vote_count": 1406
    },
    {
      "adult": false,
      "backdrop_path": "/xvzxqKWltnj6qSiWBXRq6ZCdcrw.jpg",
      "genre_ids": [
        53,
        18
      ],
      "id": 1151534,
      "original_language": "es",
      "original_title": "Nowhere",
      "overview": "A young pregnant woman named Mia escapes from a country at war by hiding in a maritime container aboard a cargo ship. After a violent storm, Mia gives birth to the child while lost at sea, where she must fight to survive.",
      "popularity": 762.221,
      "poster_path": "/zwKaPkkLizCg1onpHQq89LWugkS.jpg",
      "release_date": "2023-09-29",
      "title": "Nowhere",
      "video": false,
      "vote_average": 7.602,
      "vote_count": 743
    },
    {
      "adult": false,
      "backdrop_path": "/zgQQF04u3OgNBJqClRNby1FPz9s.jpg",
      "genre_ids": [
        16,
        10751,
        28,
        878
      ],
      "id": 893723,
      "original_language": "en",
      "original_title": "PAW Patrol: The Mighty Movie",
      "overview": "A magical meteor crash-lands in Adventure City, gives the PAW Patrol pups superpowers, and transforms them into The Mighty Pups. When the Patrol's archrival Humdinger breaks out of jail and teams up with mad scientist Victoria Vance to steal the powers for themselves, the Mighty Pups must save Adventure City and stop the supervillains before it's too late.",
      "popularity": 772.128,
      "poster_path": "/aTvePCU7exLepwg5hWySjwxojQK.jpg",
      "release_date": "2023-09-21",
      "title": "PAW Patrol: The Mighty Movie",
      "video": false,
      "vote_average": 7.3,
      "vote_count": 67
    },
    {
      "adult": false,
      "backdrop_path": "/bQTfSXQrcVwXJ5TvNzbd3ioMnnM.jpg",
      "genre_ids": [
        9648,
        53,
        28,
        18
      ],
      "id": 862552,
      "original_language": "en",
      "original_title": "The Ritual Killer",
      "overview": "Unable to process the death of his daughter, Detective Boyd embarks on a hunt for a serial killer who murders according to a brutal tribal ritual: Muti. The only person who can help Boyd is Professor Mackles, an anthropologist who hides an unspeakable secret. The line between sanity and madness thins as Boyd goes deeper into the killer’s world.",
      "popularity": 650.313,
      "poster_path": "/1VtHaELqLMovl8EueBWHDtihhzF.jpg",
      "release_date": "2023-03-09",
      "title": "The Ritual Killer",
      "video": false,
      "vote_average": 5.908,
      "vote_count": 157
    },
    {
      "adult": false,
      "backdrop_path": "/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg",
      "genre_ids": [
        28,
        53,
        80
      ],
      "id": 762430,
      "original_language": "en",
      "original_title": "Retribution",
      "overview": "When a mysterious caller puts a bomb under his car seat, Matt Turner begins a high-speed chase across the city to complete a specific series of tasks. With his kids trapped in the back seat and a bomb that will explode if they get out of the car, a normal commute becomes a twisted game of life or death as Matt follows the stranger's increasingly dangerous instructions in a race against time to save his family.",
      "popularity": 962.165,
      "poster_path": "/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg",
      "release_date": "2023-08-23",
      "title": "Retribution",
      "video": false,
      "vote_average": 6.99,
      "vote_count": 514
    }
  ]);


  const [genres, setGenres] = useState([
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]);




  // useEffect(() => {
  //   const getMedias = async () => {
  //     try {
  //       const { data } = await axios.get(`https://moonflix-api.vercel.app/api/v1/${mediaType}/${mediaCategory}?page=1`)
  //       setMovies(data.results);
  //       dispatch(setGlobalLoading(false));

  //     } catch (err) {
  //       toast.error(err.message);

  //     }
  //   };

  //   const getGenres = async () => {
  //     dispatch(setGlobalLoading(true));
  //     try {
  //       const { data } = await axios.get(`https://moonflix-api.vercel.app/api/v1/${mediaType}/genres`)

  //       setGenres(data.genres);
  //       getMedias();

  //     } catch (err) {
  //       toast.error(err.message);
  //       setGlobalLoading(false);
  //     }

  //   };

  //   getGenres();
  // }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box sx={{
      position: "relative",
      color: "primary.contrastText",
      "&::before": {
        content: '""',
        width: "100%",
        height: "30%",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
        ...uiConfigs.style.gradientBgImage[theme.palette.mode]
      }
    }}>
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <Box sx={{
              paddingTop: {
                xs: "130%",
                sm: "80%",
                md: "60%",
                lg: "45%"
              },
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${tmdbConfigs.backdropPath(movie.backdrop_path || movie.poster_path)})`
            }} />
            <Box sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
            }} />
            <Box sx={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              paddingX: { sm: "10px", md: "5rem", lg: "10rem" }
            }}>
              <Box sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                paddingX: "30px",
                color: "text.primary",
                width: { sm: "unset", md: "30%", lg: "40%" }
              }}>
                <Stack spacing={4} direction="column">
                  {/* title */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                    fontWeight="700"
                    sx={{
                      ...uiConfigs.style.typoLines(2, "left")
                    }}
                  >
                    {movie.title || movie.name}
                  </Typography>
                  {/* title */}

                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rating */}
                    <CircularRate value={movie.vote_average} />
                    {/* rating */}

                    <Divider orientation="vertical" />
                    {/* genres */}
                    {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                      <Chip
                        variant="filled"
                        color="primary"
                        key={index}
                        label={genres.find(e => e.id === genreId) && genres.find(e => e.id === genreId).name}
                      />
                    ))}
                    {/* genres */}
                  </Stack>

                  {/* overview */}
                  <Typography variant="body1" sx={{
                    ...uiConfigs.style.typoLines(3)
                  }}>
                    {movie.overview}
                  </Typography>
                  {/* overview */}

                  {/* buttons */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    // to={routesGen.mediaDetail(mediaType, movie.id)}
                    href={"/somwhere"}
                    sx={{ width: "max-content" }}
                  >
                    watch now
                  </Button>
                  {/* buttons */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;