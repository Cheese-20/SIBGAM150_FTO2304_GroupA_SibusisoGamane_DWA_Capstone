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

// import { Box, TextField, Button } from "@mui/material";
// import { useState,useEffect } from "react";
// export default function Login() {
//   const [form, setForm] = useState("Login");
//   const [name,setName] =useState("");
//   const [Email,setEmail] =useState("");
//   const [surname,setSurname] =useState("");
//   const [Password,setPassword] =useState("");
// const navigate = useNavigate();


//   useEffect (() =>{
//     // getInfo();
//   },[])


//   return (
//     <>
//       {form === "Login" ? (
//         // Login form
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             maxWidth: 600,
//             alignItems: "center",
//             justifyContent: "center",
//             m: "auto",
//             mt: 5,
//           }}
//         >
//           <TextField
//             variant="outlined"
//             placeholder="Email"
//             type="email"
//             margin="normal"
//             onChange={(e)=>{setEmail(e.target.value)}}
//           ></TextField>
//           <TextField
//             variant="outlined"
//             placeholder="Password"
//             type="password"
//             margin="normal"
//             onChange={(e)=>{setPassword(e.target.value)}}
//           ></TextField>
//           <Button variant="contained" onClick={()=>handleLogin(Email,Password)} >Login</Button>
//           <Button onClick={()=>setForm('SignUp')}>No account? SignUp</Button>
//         </Box>
//       ) : (
//         // signUp form
//         <Box>
//           <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             maxWidth: 600,
//             alignItems: "center",
//             justifyContent: "center",
//             m: "auto",
//             mt: 5,
//           }}
//         >
//           <TextField
//             variant="outlined"
//             placeholder="Name"
//             type="text"
//             margin="normal"
//             onChange={(e)=>{setName(e.target.value)}}
//           ></TextField>
//           <TextField
//             variant="outlined"
//             placeholder="Surname"
//             type="text"
//             margin="normal"
//             onChange={(e)=>{setSurname(e.target.value)}}
//           ></TextField>
//           <TextField
//             variant="outlined"
//             placeholder="Email"
//             type="email"
//             margin="normal"
//             onChange={(e)=>{setEmail(e.target.value)}}
//           ></TextField>
//           <TextField
//             variant="outlined"
//             placeholder="Password"
//             type="password"
//             margin="normal"
//             onChange={(e)=>{setPassword(e.target.value)}}
//           ></TextField>
//           <Button variant="contained" >SignUp</Button>
//           <Button onClick={()=>setForm('Login')}> Have an account? Login</Button>
//         </Box>
//         </Box>
//       )}
//     </>
//   );
// }
