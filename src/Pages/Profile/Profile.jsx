import { useState, useEffect } from "react";

//database
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://kedoblxacqfbaufcpgoi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZG9ibHhhY3FmYmF1ZmNwZ29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MzI1OTEsImV4cCI6MjAxNDEwODU5MX0.xwmaTnFfzRnHG_Tk3dfrOGpDJOEUKOp7Fhj_thEqmbI"
);

function Profile() {
  //   const [fetchError, setFetchError] = useState(null);
  const [user, setUser] = useState({});

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       const { data, error } = await supabase.from("Podcast").select();

  //       if (error) {
  //         setFetchError("Data is not there");
  //         setUser(null);
  //         console.log(error);
  //       }

  //       if (data) {
  //         setUser(data);
  //         setFetchError(null);
  //       }
  //     };

  //     fetchUser();
  //   }, []);

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

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
            <p>hello</p>
            <button onClick={() => signOutUser()}>sign out </button>
            {console.log(user)}
          </>
        ) : (
            <>

          <h1>Nothing to see here user is not logged in</h1>

            <button onClick={()=>{navigate("/")}}>Login</button>
          </>

        )}
      </div>

     
    </>
  );
}

export default Profile;
