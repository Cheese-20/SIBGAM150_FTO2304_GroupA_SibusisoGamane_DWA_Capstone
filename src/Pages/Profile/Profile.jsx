import { useState, useEffect } from "react";
import PodcastCard from "/src/components/Preview.jsx";

//database
import { useNavigate } from "react-router-dom";
import supabase from "../../Functions/supabase";
import {
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function Profile() {
  // const [fetchError, setFetchError] = useState(null);
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState([]);

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Surname, setSurname] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    //user info after login
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user);
        }
      });
    }

    getUserData();
    userData();
  }, []);

  async function userData() {
    try {
      const { data, error } = await supabase
        .from("PodCast")
        .select()
        .eq("email", user.email);

      if (error) throw error;
      if (data !== null) {
        setUserInfo(data);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  const [content, setContent] = useState([]);
  const [sortVal, setSort] = useState("");
  const [Dates, setDates] = useState("");

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

  async function CreateUser() {
    try {
      const { data, error } = await supabase
        .from("PodCast")
        .insert({
          name: Name,
          surname: Surname,
          email: Email,
          password: Password,
        })
        .single();
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  }

  async function EditUser() {
    try {
      const { data, error } = await supabase
        .from("PodCast")
        .update({
          name: Name,
          surname: Surname,
          email: Email,
          password: Password,
        })
        .eq("email", Email);

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  }

  const[favData,setFavData] = useState([])

  async function Fav() {
    try {
      const { data, error } = await supabase
        .from("PodCast")
        .select("favourites");
        setFavData(data)

      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();

  const signOutUser = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <>
      <div>
        {Object.keys(user).length !== 0 ? (
          <>
            <h2>Welcome {userInfo.map((item) => item.name)}</h2>
            {console.log(userInfo)}

            <Typography>Edit Details</Typography>
            <Typography variant="subtitle3">
              If you just signed up please complete account
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: 600,
                  alignItems: "center",
                  justifyContent: "center",
                  m: "auto",
                  mt: 5,
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Name"
                  type="text"
                  margin="normal"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></TextField>
                <TextField
                  variant="outlined"
                  placeholder="Surname"
                  type="text"
                  margin="normal"
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                ></TextField>
                <TextField
                  variant="outlined"
                  placeholder="Email"
                  type="email"
                  margin="normal"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></TextField>
                <TextField
                  variant="outlined"
                  placeholder="Password"
                  type="password"
                  margin="normal"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></TextField>
                <Box sx={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    onClick={CreateUser}
                    sx={{ mr: 2 }}
                  >
                    Complete account
                  </Button>
                  <Button variant="contained" onClick={EditUser}>
                    Edit info
                  </Button>
                </Box>
              </Box>
            </Box>

            <Typography>Favorites</Typography>
            <div style={{ display: "flex" }}>
              <FormControl>
                <InputLabel id="placeholder-select-label">
                  Sort shows
                </InputLabel>
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
                <InputLabel id="placeholder-select-label">
                  Sort Dates
                </InputLabel>
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

            <Box>
              {favData.map((item, index) => {
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

            <button onClick={() => signOutUser()}>sign out </button>
          </>
        ) : (
          <>
            <h1>Nothing to see here user is not logged in</h1>

            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
