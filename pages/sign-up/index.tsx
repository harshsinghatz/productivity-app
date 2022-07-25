import { TextField, Button, DesktopDatePicker } from "@mui/material";
import { NextPage } from "next";
import LoginContainer from "./styles";
import { useState } from "react";
const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(new Date());

  const loginHandler = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
        dateOfBirth,
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
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setEmail(e.target.value)}
        />
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button variant="contained">Register</Button>
      </form>
    </LoginContainer>
  );
};

export default Login;
