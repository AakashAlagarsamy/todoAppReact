import React, { useRef, useEffect } from "react";
import store from "./../redux/reduxStore";
import { getFormattedDateTime } from "./../utils/utils";
import PropTypes from "prop-types";

function InputContainer(props) {
  const taskInputRef = useRef();
  const { handleReRender } = props;

  useEffect(() => {
    taskInputRef.current.focus();
  });

  const handleAddTask = () => {
    const taskName = taskInputRef.current.value.trim();
    if (taskName !== "") {
      store.dispatch({
        type: "addTask",
        payload: {
          name: taskName,
          timeString: getFormattedDateTime(new Date()) + " (Added) "
        }
      });
    }
    taskInputRef.current.value = "";
    handleReRender();
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

InputContainer.propTypes = {
  handleReRender: PropTypes.func
};
