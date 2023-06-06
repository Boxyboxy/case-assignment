import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
export default function Login({ toggle }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/users/login", { username, password })
      .then((response) => {
        console.log(response.data.username);
        console.log(response.data.id);
        setUser({ id: response.data.id, username: response.data.username });
        setLoginStatus(`User ${username} logged in`);
        navigate("/list");
      })
      .catch(function (err) {
        setLoginStatus(err.response.data.error);
      });
  };
  return (
    <div className="login">
      <h1> Login</h1>
      <label>Username</label>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <div className="buttons">
        <a href="/" onClick={toggle}>
          Register
        </a>
        <button onClick={handleLogin}>Login</button>
      </div>

      {loginStatus !== "" ? <h3>Login Status : {loginStatus}</h3> : <></>}
    </div>
  );
}
