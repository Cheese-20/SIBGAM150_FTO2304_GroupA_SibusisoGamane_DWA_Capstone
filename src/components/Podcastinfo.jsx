import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { Card, CardMedia, CardContent } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  height: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ShowInfo({ children, ShowId, ShowPic, ShowGenre }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        `https://podcast-api.netlify.app/id/${ShowId}`
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

  const ShowEpisodes = [];
  const HandleClick = (val) => {
    console.log(val);
    ShowEpisodes.push(ShowContent.seasons[val - 1].episodes);
  };

  React.useEffect(() => {
    FetchShows();
  }, []);

  return (
    <div>
      <Button onClick={handleOpen} className="media">
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {ShowContent.title}
          </Typography>

          <Box sx={{ display: "flex" }}>
            <img src={ShowPic} width="400px" height="350px" align="center" />

            <Typography variant="subtitle2" sx={{ pl: 2 }}>
              {ShowContent.description}
            </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Typography variant="h6" component="h2" sx={{ pr: 2 }}>
              Genre:
            </Typography>
            <Box sx={{ p: 2 }}>
              {ShowGenre.map((index) => {
                return <div key={index}>{genreTypes[index - 1]}, </div>;
              })}
            </Box>
          </Box>

          <Typography variant="h6" component="h2">
            Seasons:
          </Typography>
          <Box>
            <Stack direction="row" spacing={1}>
              {ShowContent
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

          <Typography variant="h6" component="h2" sx={{ pt: 2 }}>
            Episodes:
          </Typography>
          <Box>
            {!ShowEpisodes &&
              ShowEpisodes.map((item) => {
                return (
                  <Card key={item.id}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.episode}
                      </Typography>
                      <audio controls>
                        <source
                          src={item.file}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </CardContent>
                  </Card>
                );
              })}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
