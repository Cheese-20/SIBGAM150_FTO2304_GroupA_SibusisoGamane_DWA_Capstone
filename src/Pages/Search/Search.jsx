import { TextField, Button, Box } from "@mui/material";
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
