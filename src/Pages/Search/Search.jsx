import { TextField, FormControl,
    InputLabel,
    Select,
    MenuItem, Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import PodcastCard from "/src/components/Preview.jsx";
import "./search.css";
import Fuse from "fuse.js";

function Search() {
  const [search, setSearch] = useState("");
  const [content, setContent] = useState([]);

  //! fuzzy search
  const fuse = new Fuse(content, {
    keys: ["title", "description"],
  });

  const result = fuse.search(search);

  function handleSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    setSearch(value);
    setContent(search ? result.map((item) => item.item) : content);
  }

  // !Api
  const FetchSearch = async () => {
    try {
      const { data } = await axios.get("https://podcast-api.netlify.app/shows");
      if (data) {
        console.log(data);
        setContent(data);
      } else {
        console.log("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    FetchSearch();
  }, []);

  const handleSort = (Type) => {
    if (Type == "Asc") {
      setContent(
        content.sort((show1, show2) =>
          show1.title < show2.title ? 1 : show1.title > show2.title ? -1 : 0
        )
      );
    } else {
      setContent(
        content.sort((show1, show2) =>
          show1.title > show2.title ? 1 : show1.title < show2.title ? -1 : 0
        )
      );
    }
  };

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

      <div>
      <FormControl>
        <InputLabel id="placeholder-select-label">Select an option</InputLabel>
        <Select
          labelId="placeholder-select-label"
          id="placeholder-select"
          value={search}
          onChange={handleSearch}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Sort by
          </MenuItem>
          <MenuItem value="Asc">A-Z</MenuItem>
          <MenuItem value="Desc">Z-A</MenuItem>
        </Select>
      </FormControl>
      {/* {renderResult()} */}
    </div>

      <div>
        <Box className="Grid-Cont">
          {content &&
            content.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  pic={item.image}
                  title={item.title}
                  season={item.seasons}
                  update={item.updated}
                  className="Pod-Grid"
                />
              );
            })}
        </Box>
      </div>
    </>
  );
}

export default Search;
