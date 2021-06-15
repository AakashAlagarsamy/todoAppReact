import React, { useRef, useEffect } from "react";
import store from "./../redux/reduxStore";
import { getFormattedDateTime } from "./../utils/utils";
import * as actions from "../redux/actions";

function InputContainer() {
  const taskInputRef = useRef();

  useEffect(() => {
    taskInputRef.current.focus();
  });

  const handleAddTask = () => {
    const taskName = taskInputRef.current.value.trim();
    if (taskName !== "") {
      const timeString = getFormattedDateTime(new Date()) + " (Added) ";
      store.dispatch(actions.addTask(taskName, timeString));
    }
    taskInputRef.current.value = "";
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="inputContainer">
      <input
        onKeyPress={(event) => handleKeyPress(event)}
        ref={taskInputRef}
        id="taskTextField"
        type="text"
        placeholder="Enter your task..."
        autoComplete="off"
      />
      <button
        onClick={() => handleAddTask()}
        id="addButton"
        type="submit"
        value="Add"
      >
        <i className="addIcon fas fa-plus"></i>
      </button>
    </div>
  );
}

export default InputContainer;
