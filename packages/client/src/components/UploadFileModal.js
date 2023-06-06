import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState } from "react";
export default function UploadFileModal({ item, fetchTasks }) {
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

  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // uploads file, updates database
  const uploadFile = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "seagroup");
    const uploadResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/dbq7yg58d/auto/upload/",
      formData
    );
    console.log(uploadResponse.data.secure_url);

    handleSaveTask(uploadResponse.data.secure_url, item.id);
  };
  // updates database and refetches all tasks
  const handleSaveTask = (file_url, id) => {
    const updateTask = async (file_url, id) => {
      try {
        const response = await axios.patch(
          `http://localhost:8080/tasks/${id}`,
          {
            file: file_url,
          }
        );

        console.log(response.data);
        fetchTasks();
      } catch (err) {
        console.log(err);
      }
    };

    updateTask(file_url, id);
    handleClose();
  };

  return (
    <>
      <button onClick={handleOpen}>Attach</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <label>Upload file for task #{item.task}</label>
          <input type="file" onChange={handleFileChange} />
          <button onClick={uploadFile}> Upload</button>
        </Box>
      </Modal>
    </>
  );
}
