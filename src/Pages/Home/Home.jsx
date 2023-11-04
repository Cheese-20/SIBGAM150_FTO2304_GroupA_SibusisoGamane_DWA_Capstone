import "./home.css";
import { Typography, Box, Stack, Chip } from "@mui/material";
import React from "react";
import PodcastCard from "/src/components/Preview.jsx";
import axios from "axios";

//database
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://kedoblxacqfbaufcpgoi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZG9ibHhhY3FmYmF1ZmNwZ29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MzI1OTEsImV4cCI6MjAxNDEwODU5MX0.xwmaTnFfzRnHG_Tk3dfrOGpDJOEUKOp7Fhj_thEqmbI"
);



function Home() {
  const [content, setContent] = React.useState([]);
  // const [user, setUser] = React.useState({});
  // const navigate = useNavigate()

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

  //getUser info

  // const FetchUser = async() =>{
  //   await supabase.auth.getUser().then((value)=>{
  //     if(value.data?.user){
  //       console.log(value.data.user)
  //       setUser(value.data.user)
  //     }
  //   })
  // }

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
    // FetchUser();
  }, []);

  const [GenreArr, setGenre] = React.useState([]);
  const HandleClick = (valIndx) => {
    content.map((item) => {
      const genreItem = item.genres;
      genreItem.map((value) => {
        if (value === valIndx) {
          setGenre(item);
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

      <Box>
        {GenreArr &&
          GenreArr.map((item, index) => {
            if (index>=0) {
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
    </>
  );
}

export default Home;
