import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
export default function TodoListOld() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [checked, setChecked] = useState([]);
  const addChecklistItem = () => {
    // TODO
  };
  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };
  // Return classes based on whether item is checked
  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const checkList = [
    "Go to www.mysql.com",
    "Download installer",
    "Execute",
    "review",
    "Todo 1",
    "Todo 2",
  ];
  return (
    <div>
      <h3>Checklist</h3>
      <div className="checkList">
        <div className="title">Your CheckList:</div>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item)}>
                <button>Attach</button>
                {item}
              </span>
            </div>
          ))}
          <button onClick={addChecklistItem}>Add</button>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
