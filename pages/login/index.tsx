import { TextField, Button } from "@mui/material";
import { NextPage } from "next";
import LoginContainer from "./styles";
import { useState } from "react";
const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "GET",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.message);
      });
  };

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
        <Button variant="contained">Login</Button>
      </form>
    </LoginContainer>
  );
};

export default Login;
