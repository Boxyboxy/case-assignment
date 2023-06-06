import React from "react";
import { useContext, useState, useEffect, ChangeEvent } from "react";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddTaskModal from "../components/AddTaskModal";
import UploadFileModal from "../components/UploadFileModal";

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

  // fetches all tasks with checkbox reflecting done status
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
  // update done status of individual task, fetchtasks endpoint call nested in this method
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
                {item.file ? (
                  <button>View</button>
                ) : (
                  <UploadFileModal item={item} />
                )}

                {item.task}
              </span>
            </div>
          ))}

          <div className="modal">
            <AddTaskModal fetchTasks={fetchTasks} />
          </div>
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
