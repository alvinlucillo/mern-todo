import React, { useState } from "react";

import { formatFromISODate, formatToISODate } from "../utils/Utils";

import { Button, TextField } from "@mui/material";

const NewTodo = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  const handleTextChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }

    if (e.target.name === "due") {
      setDue(formatToISODate(e.target.value));
    }
  };

  const handleAdd = () => {
    onAdd(title, due);
    clearFields();
    onClose();
  };

  const handleClose = () => {
    onClose();
    clearFields();
  };

  const clearFields = () => {
    setTitle("");
    setDue("");
  };

  return (
    <div>
      <TextField
        label="Title"
        size="small"
        margin="dense"
        value={title}
        onChange={handleTextChange}
        name="title"
      />{" "}
      <br />
      <TextField
        name="due"
        label="Due on"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
        margin="dense"
        value={formatFromISODate(due)}
        onChange={handleTextChange}
      />
      <br />
      <Button onClick={handleAdd}>ADD</Button>{" "}
      <Button onClick={handleClose}>CLOSE</Button>
    </div>
  );
};

export default NewTodo;
