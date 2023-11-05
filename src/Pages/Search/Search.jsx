import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import PodcastCard from "/src/components/Preview.jsx";
import "./search.css";
import Fuse from "fuse.js";

function Search() {
  const [search, setSearch] = useState("");
  const [content, setContent] = useState([]);
  const [sortVal, setSort] = useState("");
  const [Dates, setDates] = useState("");
  const [load, setLoad] = useState(true);

  //! fuzzy search
  const fuse = new Fuse(content, {
    keys: ["title", "description"],
  });

  const result = fuse.search(search);

  function handleSearch(event) {
    const value = event.target.value;
    setSearch(value);
   setContent(search !== '' ? result.map((item) => item.item) : content);
  }

  //Sorting the podcast
  const handleSort = (event) => {
    const sortVal = event.target.value;
    if (sortVal == "Asc") {
      setSort("Asc");
      setContent(
        content.sort((show1, show2) =>
          show1.title > show2.title ? 1 : show1.title < show2.title ? -1 : 0
        )
      );
    } else if (sortVal == "Desc") {
      setSort("Desc");
      setContent(
        content.sort((show1, show2) =>
          show1.title < show2.title ? 1 : show1.title > show2.title ? -1 : 0
        )
      );
    } else {
      setContent(content);
    }
  };

  //Sort by dates
  const handleDates = (event) => {
    const sortVal = event.target.value;
    if (sortVal == "Asc") {
      setDates("Asc");
      setContent(
        content.sort((show1, show2) =>
          show1.updated > show2.updated
            ? 1
            : show1.updated < show2.updated
            ? -1
            : 0
        )
      );
    } else if (sortVal == "Desc") {
      setDates("Desc");
      setContent(
        content.sort((show1, show2) =>
          show1.updated < show2.updated
            ? 1
            : show1.updated > show2.updated
            ? -1
            : 0
        )
      );
    } else {
      setContent(content);
    }
  };
  // !Api
  const FetchSearch = async () => {
    try {
      const { data } = await axios.get("https://podcast-api.netlify.app/shows");
      if (data) {
        console.log(data);
        setContent(data);
        setLoad(false);
      } else {
        console.log("Invalid response structure");
        setLoad(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoad(false);
    }

    //Loading state
  };

  // ShowMore Button
  const [VisibleShows, setVisibleShows] = useState(21);

  const AddMore = () => {
    setVisibleShows(VisibleShows + 9);
  };

  const ViewedData = content.slice(0, VisibleShows);

  useEffect(() => {
    FetchSearch();
    console.log("render");
  }, []);

  return (
    <>
      <div style={{ display: "flex", margin: "15px 0" }}>
        <TextField
          style={{ flex: 1 }}
          className="searchbox"
          label="Search"
          variant="filled"
          onChange={handleSearch}
          value={search}
        />
      </div>

      <div style={{ display: "flex" }}>
        <FormControl>
          <InputLabel id="placeholder-select-label">Sort shows</InputLabel>
          <Select
            labelId="placeholder-select-label"
            id="placeholder-select"
            value={sortVal}
            onChange={handleSort}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Sort by
            </MenuItem>
            <MenuItem value="Asc">A-Z</MenuItem>
            <MenuItem value="Desc">Z-A</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="placeholder-select-label">Sort Dates</InputLabel>
          <Select
            labelId="placeholder-select-label"
            id="placeholder-select"
            value={Dates}
            onChange={handleDates}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Sort by Date
            </MenuItem>
            <MenuItem value="Asc">Ascending</MenuItem>
            <MenuItem value="Desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        {load ? (
          <p>Loading...</p>
        ) : (
          <Box className="Grid-Cont">
            {content &&
              ViewedData.map((item, index) => {
                return (
                  <PodcastCard
                    key={index}
                    ShowId={item.id}
                    genres={item.genres}
                    pic={item.image}
                    title={item.title}
                    season={item.seasons}
                    update={item.updated}
                    className="Pod-Grid"
                  />
                );
              })}
          </Box>
        )}
      </div>
      {VisibleShows < content.length && (
        <button onClick={AddMore}> Show More </button>
      )}
    </>
  );
}

export default Search;
