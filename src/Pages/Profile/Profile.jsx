import { useState, useEffect } from "react";

//database
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import supabase from "../../Functions/supabase";
import { Typography } from "@mui/material";

function Profile() {
  // const [fetchError, setFetchError] = useState(null);
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState([]);

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
