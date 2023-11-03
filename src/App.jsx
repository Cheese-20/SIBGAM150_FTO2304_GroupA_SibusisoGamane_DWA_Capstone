import {  Container } from "@mui/material";
import NavigationBar from "./components/MainNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./Pages/Search/Search";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Episodes from "./Pages/Episodes/episodes";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
      <NavigationBar />
        <Container>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/search" element={ <Search/> } />
            <Route path="/profile" element={ <Profile/> } />
            <Route path="/episodes/:id/:genre" element={ <Episodes/> } />
          </Routes>
        </Container>
     
      
      
     

      {/* <Box sx={{ display: "flex", overflowX: "auto" }} className="pod-data"> */}
        {/* {TrendingArray.map((item) => {
          return (<PodcastBlock
            key={item.id}
            pic={item.image}
            title={item.title}
            season={item.seasons}
            update={item.updated}
          />);
        })} */}
      {/* </Box> */}

      </BrowserRouter>
    </>
  );
}

export default App;
