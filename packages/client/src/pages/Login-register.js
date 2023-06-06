import { useState } from "react";
import axios from "axios";
import Login from "../components/Login";
import Register from "../components/Register";

function LoginRegister() {
  const [loginFlag, setLoginFlag] = useState(true);
  const [registerFlag, setRegisterFlag] = useState(false);

  const toggle = (e) => {
    e.preventDefault();
    if (loginFlag && !registerFlag) {
      setRegisterFlag(true);
      setLoginFlag(false);
    } else {
      setRegisterFlag(false);
      setLoginFlag(true);
    }
  };

  console.log(loginFlag);
  console.log(registerFlag);

  return (
    <div className="App">
      {loginFlag && !registerFlag ? (
        <Login toggle={toggle} />
      ) : (
        <Register toggle={toggle} />
      )}
    </div>
  );
}

export default LoginRegister;
