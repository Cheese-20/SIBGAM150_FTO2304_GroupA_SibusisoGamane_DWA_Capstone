import "./home.css";
import { Typography, Box, Stack, Chip } from "@mui/material";
import React from "react";
import PodcastCard from "/src/components/Preview.jsx";
import axios from "axios";

function Home() {
  const [content, setContent] = React.useState([]);

  //if true show loading else don't show
  const [loading, setLoading] = React.useState(true);

  const FetchSearch = async () => {
    try {
      const { data } = await axios.get("https://podcast-api.netlify.app/shows");
      if (data) {
        setContent(data);
        setLoading(false);
      } else {
        console.log("Invalid response structure");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const genreTypes = [
    "Personal Growth",
    "True Crime and Investigative Journalism",
    "History",
    "Comedy",
    "Entertainment",
    "Business",
    "Fiction",
    "News",
    "Kids and Family",
  ];

  React.useEffect(() => {
    FetchSearch();
  }, []);

  const [GenreArr, setGenre] = React.useState([]);
  const HandleClick = (valIndx) => {
    content.forEach((item) => {
      const genreItem = item.genres;
      if (Array.isArray(genreItem)) {
        genreItem.forEach((value) => {
          if (value - 1 === valIndx) {
            setGenre((prevGenreArr) => [...prevGenreArr, item]);
          }
        });
      }
    });
  };

  const TrendingArray = [];

  for (let i = 0; i <= 10; i++) {
    const random = Math.floor(Math.random() * content.length);
    if (content[random]) {
      TrendingArray.push(content[random]);
    }
  }

  return (
    <>
      <Typography sx={{ m: 1 }}>Trending</Typography>
      {loading ? (
        <p>loading...</p>
      ) : (
        <Box sx={{ display: "flex", overflowX: "auto" }} className="pod-data">
          {TrendingArray.map((item, index) => (
            <PodcastCard
              key={index}
              ShowId={item.id}
              genres={item.genres}
              pic={item.image}
              title={item.title}
              season={item.seasons}
              update={item.updated}
            />
          ))}
        </Box>
      )}

      <Typography sx={{ m: 1 }}>All Shows</Typography>
      <Box>
        <Stack direction="row" spacing={1}>
          {genreTypes
            ? genreTypes.map((item, index) => {
                return (
                  <Chip
                    label={item}
                    key={index}
                    onClick={() => HandleClick(index)}
                  />
                );
              })
            : null}
        </Stack>
      </Box>

      {loading ? (
        <p>loading...</p>
      ) : (
        <Box>
          {Array.isArray(GenreArr) &&
            GenreArr.map((item, index) => {
              if (index >= 0) {
                return (
                  <PodcastCard
                    key={index}
                    ShowId={item.id}
                    genres={item.genres}
                    pic={item.image}
                    title={item.title}
                    season={item.seasons}
                    update={item.updated}
                  />
                );
              } else {
                return <div key="item">element not there</div>;
              }
            })}
          {console.log(GenreArr)}
        </Box>
      )}
    </>
  );
}

export default Home;
