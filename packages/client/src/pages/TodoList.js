import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function TodoList() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [checkList, setCheckList] = useState([
    "Go to www.mysql.com",
    "Download installer",
    "Execute",
    "review",
    "Todo 1",
    "Todo 2",
  ]);
  const [checked, setChecked] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/tasks/${user.id}`
      );

      setCheckList(response.data);

      const checkedTasks = response.data.filter(
        (element) => element.done == true
      );
      setChecked(checkedTasks);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (checked, id) => {
    try {
      const response = await axios.patch(`http://localhost:8080/tasks/${id}`, {
        done: checked,
      });

      console.log(response.data);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };
  // Return classes based on whether item is checked
  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";
  // Add/Remove checked item from list
  const handleCheck = (event) => {
    console.log(event.target.id);
    console.log(event.target.value);
    updateTask(event.target.checked, event.target.id);

    // var updatedList = [...checked];
    // if (event.target.checked) {
    //   updatedList = [...checked, event.target.value];
    // } else {
    //   updatedList.splice(checked.indexOf(event.target.value), 1);
    // }
    // setChecked(updatedList);
  };

  const addChecklistItem = () => {
    // TODO
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (user.id) {
      fetchTasks();
    }
  }, [user]);

  return (
    <div>
      <h3>Checklist</h3>
      <div className="checkList">
        <div className="title">Your CheckList:</div>
        <div className="list-container">
          {checkList.map((item) => (
            <div key={item.id}>
              <input
                id={item.id}
                value={item.task}
                type="checkbox"
                onChange={handleCheck}
                defaultChecked={item.done}
              />
              <span className={isChecked(item)}>
                {item.file ? <button>View</button> : <button>Attach</button>}
                {item.task}
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
