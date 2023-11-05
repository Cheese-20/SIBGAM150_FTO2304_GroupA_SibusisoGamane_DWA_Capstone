import { useParams } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import supabase from "../../Functions/supabase";
import { Card, CardContent, CardMedia } from "@mui/material";

export default function Episodes() {
  const { id, genre } = useParams();
  const genres = genre.split(",");
  const genreTypes = {
    0: "Personal Growth",
    1: "True Crime and Investigative Journalism",
    2: "History",
    3: "Comedy",
    4: "Entertainment",
    5: "Business",
    6: "Fiction",
    7: "News",
    8: "Kids and Family",
  };

  const [ShowContent, setShowContent] = React.useState([]);

  const FetchShows = async () => {
    try {
      const { data } = await axios.get(
        `https://podcast-api.netlify.app/id/${id}`
      );
      if (data) {
        setShowContent(data);
      } else {
        console.log("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [Episode, setEpisode] = React.useState();
  const HandleClick = (val) => {
    console.log(val);
    setEpisode(ShowContent.seasons[val - 1]).episodes;
  };

  const HandleFavs = async (index) => {
    try {
      const { data, error } = await supabase.from("PodCast")
      .update({
        favourites : Episode[index],
      });

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    FetchShows();
  }, []);

  return (
    <div>
      <Box>
        <Typography variant="h6" component="h2">
          {ShowContent.title}
        </Typography>

        <Typography variant="subtitle2" sx={{ pl: 2 }}>
          {ShowContent.description}
        </Typography>

        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" component="h2" sx={{ pr: 2 }}>
            Genre:
          </Typography>
          <Box sx={{ p: 2 }}>
            {genres.length > 0 ? (
              genres.map((index) => {
                return <div key={index}>{genreTypes[index - 1]}, </div>;
              })
            ) : (
              <div>No genre available</div>
            )}
          </Box>
        </Box>

        <Typography variant="h6" component="h2">
          Seasons:
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Stack direction="row" spacing={1}>
            {ShowContent.length !== 0
              ? ShowContent.seasons.map((item) => {
                  return (
                    <Chip
                      label={item.season}
                      key={item.id}
                      onClick={() => HandleClick(item.season)}
                    />
                  );
                })
              : null}
          </Stack>
        </Box>

        {/*Episodes display*/}
        <Typography variant="h6" component="h2" sx={{ pt: 2 }}>
          Episodes:
        </Typography>
        <Box>
          {Episode &&
            Episode.episodes.map((item) => {
              if (item && item.episode) {
                return (
                  <Card key={item.id}>
                    <Box sx={{ display: "flex" }}>
                      <CardMedia
                        sx={{ height: 140, width: 151 }}
                        image={Episode.image}
                        title={item.title}
                      />

                      <CardContent>
                        <Typography variant="h5" component="div">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Episode {item.episode}
                        </Typography>
                        <audio controls>
                          <source src={item.file} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </CardContent>
                      <button onClick={() => HandleFavs(item.index)} style={{margin :'auto'}}>
                        Add to favorite
                      </button>
                    </Box>
                  </Card>
                );
              } else {
                return <div key="item">element not there</div>;
              }
            })}
        </Box>
      </Box>
    </div>
  );
}
