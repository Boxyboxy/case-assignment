import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { UserContext } from "../components/UserContext";
import { useContext, useState } from "react";
export default function AddTaskModal({ fetchTasks }) {
  const { user, setUser } = useContext(UserContext);
  // modal attributes
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 200, lg: 450, xl: 450 },
    bgcolor: "#2b3452",
    boxShadow: 24,
    p: 4,
    margin: "0 auto",
    display: "flex",
    flexDirection: { xs: "column", lg: "row", xl: "row" },
    alignItems: "centre",
    rowGap: { xs: "12px" },
    justifyContent: { lg: "space-between", xl: "space-between" },
    borderRadius: { xs: "8px", lg: "16px", xl: "16px" },
  };
  const [taskName, setTaskName] = useState("");
  const handleSaveTask = () => {
    createTask();
    handleClose();
  };

  // creates individual task
  const createTask = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/tasks/`, {
        task: taskName,
        done: false,
        userId: user.id,
      });

      console.log(response.data);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button onClick={handleOpen}>Add</button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <label>Add Task:</label>
          <input
            className="add-task"
            type="text"
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          />
          <button onClick={handleSaveTask}> Save</button>
        </Box>
      </Modal>
    </>
  );
}
