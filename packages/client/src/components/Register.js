import React from "react";
import { useState } from "react";
import axios from "axios";
export default function Register({ toggle }) {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [registerStatus, setRegisterStatus] = useState("");

  const handleRegister = () => {
    axios
      .post("http://localhost:8080/users/register", {
        username: usernameReg,
        password: passwordReg,
      })
      .then((response) => {
        console.log(response);
        setRegisterStatus(
          `User ${usernameReg} created successfully! Try logging in!`
        );
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setRegisterStatus(err.response.data.error);
      });
  };
  return (
    <div className="registration">
      <h1> Registration</h1>
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      />
      <a href="/" onClick={toggle}>
        Login
      </a>
      <button onClick={handleRegister}>Register</button>
      {registerStatus !== "" ? (
        <h3>Register Status : {registerStatus}</h3>
      ) : (
        <></>
      )}
    </div>
  );
}
