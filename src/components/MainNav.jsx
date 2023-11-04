import { Tabs, Tab } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  
    const [onTab, setOnTab] = React.useState(0);

    const handleChange = (event, newValue) => {
      setOnTab(newValue);
    };
  
 

  return (
    <nav>
      <Tabs value={onTab} onChange={handleChange} TabIndicatorProps={{
      sx: {          
         bottom: 0,
         position:"fixed"
      }
    }}>
        <Link to="/home">
          {" "}
          <Tab label="Home" />
        </Link>
        <Link to="/search">
          {" "}

          <Tab label="Search" />
        </Link>
        <Link to="/profile">
          {" "}

          <Tab label="Profile" />
        </Link>



      </Tabs>
    </nav>
  );
}
