import "./home.css";
import { Typography, Box } from "@mui/material";
import React from "react";
import PodcastCard from "/src/components/Preview.jsx";
import axios from "axios";

function Home() {
  const [content, setContent] = React.useState([]);

  const FetchSearch = async () => {
    try {
      const { data } = await axios.get("https://podcast-api.netlify.app/shows");
      if (data) {
        setContent(data);
      } else {
        console.log("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    FetchSearch();
  }, []);

  const TrendingArray = [];

  for (let i = 0; i <= 10; i++) {
    const random = Math.floor(Math.random() * content.length);
    TrendingArray.push(content[random]);
  }
  return (
    <>
      <Typography sx={{ m: 1 }}>Trending</Typography>
      <Box sx={{ display: "flex", overflowX: "auto" }} className="pod-data">
        { TrendingArray &&
          TrendingArray.map((item) => {
            return (
              <PodcastCard
                key={item.id}
                id={item.id}
                genres={item.genres}
                pic={item.image}
                title={item.title}
                season={item.seasons}
                update={item.updated}
              />
            );
          })}
      </Box>

      <Typography sx={{ m: 1 }}>Recently played</Typography>
      <PodcastCard />

      <Typography sx={{ m: 1 }}>All Shows</Typography>

      <Box sx={{ display: "flex", overflowX: "auto" }}>
        {/* <Genres
          selectedGenres={selectedGenres}
          genres={genres}
          setgenres={setGenres}
          setselectedGenres={setSelectedGenres}
        /> */}
        {/* <View /> */}
      </Box>
    </>
  );
}

export default Home;
