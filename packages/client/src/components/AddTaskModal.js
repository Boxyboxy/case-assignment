import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { UserContext } from "../components/UserContext";
import { useContext, useState, useEffect } from "react";
export default function AddTaskModal({ fetchTasks }) {
  const { user, setUser } = useContext(UserContext);
  // modal attributes
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "#2b3452",

    boxShadow: 24,
    p: 4,
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <label>Task</label>
          <input
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
