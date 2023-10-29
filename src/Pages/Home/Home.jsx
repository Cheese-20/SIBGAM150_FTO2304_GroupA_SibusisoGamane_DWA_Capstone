import "./home.css";
import { Typography, Box, Stack, Chip } from "@mui/material";
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

  const Genre = [];

  const HandleClick = (index) => {
    content.map((item) => {
      // console.log(item)
      item.genres.map((value) => {
        if (value === index) {
          Genre.push(item);
        }
      });
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
      <Box sx={{ display: "flex", overflowX: "auto" }} className="pod-data">
        {TrendingArray.map((item) => (
          <PodcastCard
            key={item.id}
            ShowId={item.id}
            genres={item.genres}
            pic={item.image}
            title={item.title}
            season={item.seasons}
            update={item.updated}
          />
        ))}
      </Box>

      <Typography sx={{ m: 1 }}>All Shows</Typography>
      <Box>
        <Stack direction="row" spacing={1}>
          {genreTypes !== ""
            ? genreTypes.map((item, index) => {
                return (
                  <Chip
                    label={item}
                    key={item.id}
                    onClick={() => HandleClick(index)}
                  />
                );
              })
            : null}
        </Stack>
      </Box>

      <Box sx={{ display: "flex" }}>
        {Genre &&
          Genre.map((item) => (
            <PodcastCard
              key={item.id}
              ShowId={item.id}
              genres={item.genres}
              pic={item.image}
              title={item.title}
              season={item.seasons}
              update={item.updated}
            />
          ))}
      </Box>
    </>
  );
}

export default Home;
