import {  Card, CardMedia, CardContent, Typography } from "@mui/material";
import "./podcast.css";
import  returnDate  from "../Functions/BasicFx.js";
import { Link } from "react-router-dom";


// *Podcast card
export default function PodcastBlock(data) {
  const epID = {ID : data.ShowId, Pic : data.pic, genre: data.genres}
  return (

    // ShowPic={data.pic} ShowId={data.ShowId} ShowGenre={data.genres}
    <>
    <Link to={`/episodes/${epID.ID}/${epID.genre.join(',')}`} >
      <Card className="Podcast-Card" sx={{m:0.5}}>
      <CardMedia
        component="img"
        className="pod-image"
        image={data.pic}
        alt={data.title}
      />
      <CardContent>
        <Typography variant="subtitle2" component="div" sx={{display:'flex',pr:0.2}}>
          {data.title}
        </Typography>

        <Typography variant="subtitle3" component="div" sx={{display:'flex',pr:0.2}}>
          Seasons: {data.season}
        </Typography>

        <Typography variant="subtitle3" component="div" sx={{display:'flex',pr:0.2}}>
          Last edited: {returnDate(data.update)}
        </Typography>
      </CardContent>
    </Card>
    </Link>
    </>
  );
}
