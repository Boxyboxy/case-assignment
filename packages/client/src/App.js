import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registerStatus, setRegisterStatus] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const handleRegister = () => {
    axios
      .post("http://localhost:8080/users/register", {
        username: usernameReg,
        password: passwordReg,
      })
      .then((response) => {
        console.log(response);
        setRegisterStatus(`User ${usernameReg} created successfully!`);
      })
      .catch((err) => {
        console.log(err);
        setRegisterStatus(err.response.data.error);
      });
  };

  const handleLogin = () => {
    axios
      .post("http://localhost:8080/users/login", { username, password })
      .then((response) => {
        console.log(response);
        setLoginStatus(`User ${username} logged in`);
      })
      .catch(function (err) {
        setLoginStatus(err.response.data.error);
      });
  };

  return (
    <div className="App">
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

        <button onClick={handleRegister}>Register</button>
      </div>
      {registerStatus != "" ? (
        <h3>Register Status : {registerStatus}</h3>
      ) : (
        <></>
      )}
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

        <button onClick={handleLogin}>Login</button>
      </div>
      {loginStatus != "" ? <h3>Login Status : {loginStatus}</h3> : <></>}
    </div>
  );
}

export default App;
