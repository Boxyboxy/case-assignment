import React from "react";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
export default function TodoList() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      TodoList
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
