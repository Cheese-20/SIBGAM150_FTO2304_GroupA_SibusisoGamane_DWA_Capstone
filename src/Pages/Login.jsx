import supabase from "../Functions/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";


export default function Login() {
const navigate = useNavigate();

supabase.auth.onAuthStateChange( async(event) => {
  if (event === "SIGNED_IN") {
    //GO TO HOME
    navigate("/home");
  } else {
    //STAY AT LOGIN PAGE
    navigate("/");
  }
});

  return (
    <>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
      />
    </>
  );
}

