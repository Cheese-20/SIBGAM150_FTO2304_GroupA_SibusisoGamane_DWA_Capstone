import { useState, useEffect } from "react";

//database
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { Info, InfoRounded } from "@mui/icons-material";

const supabase = createClient(
  "https://kedoblxacqfbaufcpgoi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZG9ibHhhY3FmYmF1ZmNwZ29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MzI1OTEsImV4cCI6MjAxNDEwODU5MX0.xwmaTnFfzRnHG_Tk3dfrOGpDJOEUKOp7Fhj_thEqmbI"
);

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

    async function userData(){
      try {
        const { data, error } = await supabase
          .from('Podcast')
          .select()
          .eq('email', user.email);
    
        if (error) {
          console.error(error);
          return;
        }
    
        setUserInfo(data);
        console.log(data);
        
      } catch (error) {
        console.error(error);
      }
    }

    userData();
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
            <h2>Welcome {userInfo.length}</h2>
            
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
