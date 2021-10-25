import { useState } from "react";

import {
  formatToISODate,
  formatFromISODate,
  toLocaleString,
} from "../utils/Utils";

import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
} from "@mui/material";

import { CalendarToday, Delete, Edit, Done } from "@mui/icons-material";

const TodoItem = ({ todo, onEditMode, onSave, onDelete, onCheck }) => {
  const [title, setTitle] = useState(todo.title);
  const [due, setDue] = useState(formatFromISODate(todo.due));

  const isChecked = todo.status === "completed" ? true : false;

  const handleInputChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }

    if (e.target.name === "due") {
      setDue(e.target.value);
    }
  };

  const handleDone = () => {
    onSave({ ...todo, title, due: formatToISODate(due) });
    onEditMode(todo, false);
  };

  const secondaryText = !!todo.isEditMode ? null : (
    <>
      <CalendarToday style={{ fontSize: 12 }} />{" "}
      <span style={{ fontSize: 13 }} className="todoItem__due">
        {toLocaleString(todo.due)}
      </span>
    </>
  );

  const primaryText = !!todo.isEditMode ? (
    <>
      <TextField
        value={title}
        size="small"
        name="title"
        onChange={handleInputChange}
        className="todoItem__edit-textbox-title"
      />{" "}
      <br />
      <TextField
        type="date"
        value={due}
        size="small"
        name="due"
        onChange={handleInputChange}
        margin="dense"
      />
    </>
  ) : (
    <span
      className="todoItem__title"
      style={{ textDecoration: `${isChecked ? "line-through" : "none"}` }}
    >
      {todo.title}
    </span>
  );

  return (
    <ListItem key={todo.id}>
      <ListItemIcon>
        <Checkbox
          onChange={() => onCheck(todo)}
          checked={isChecked}
          className="todoItem__status"
        />
      </ListItemIcon>
      <ListItemText primary={primaryText} secondary={secondaryText} />
      <ListItemSecondaryAction>
        {!!todo.isEditMode === false && (
          <>
            <IconButton
              onClick={() => onEditMode(todo, true)}
              className="todoItem__edit-button"
            >
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDelete(todo)}>
              <Delete />
            </IconButton>
          </>
        )}

        {!!todo.isEditMode && (
          <>
            <IconButton onClick={handleDone}>
              <Done />
            </IconButton>
          </>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoItem;
