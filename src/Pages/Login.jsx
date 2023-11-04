import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://kedoblxacqfbaufcpgoi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZG9ibHhhY3FmYmF1ZmNwZ29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MzI1OTEsImV4cCI6MjAxNDEwODU5MX0.xwmaTnFfzRnHG_Tk3dfrOGpDJOEUKOp7Fhj_thEqmbI"
);

export default function Login() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange( async(event) => {
    if (event === "SIGNED_IN") {
      //GO TO HOME
      navigate("/home");
      console.log("in");
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
