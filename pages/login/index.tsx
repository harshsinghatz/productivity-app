import { TextField, Button } from "@mui/material";
import { NextPage } from "next";
import LoginContainer from "./styles";
import { useEffect, useState } from "react";
import Router from 'next/router';
const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn,setLoggedIn]=useState(false);
  const [error,setError]=useState("");

  const loginHandler = (event:Event) => {
    event.preventDefault();
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res)=>{
        if(res.success){
          setError("");
          setLoggedIn(true);
        }else{
          setError(res.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(()=>{
    if(loggedIn){
      Router.push("/");
    }
  },[loggedIn])

  return (
    <LoginContainer>
      <form className="form" onSubmit={loginHandler}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">Login</Button>
      </form>
      {error && <div className="error">{error}</div>}
    </LoginContainer>
  );
};

export default Login;
