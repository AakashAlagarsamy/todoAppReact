import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import store from "./../redux/reduxStore";
import { getFormattedDateTime } from "./../utils/utils";

function TaskContainer(props) {
  const updateTaskRef = useRef();
  const { handleReRender } = props;

  const [stateValue, setStateValue] = useState({
    editStatus: false,
    taskNameHtml: props.task.name
  });

  const handleRemoveTask = (id) => {
    store.dispatch({
      type: "removeTask",
      payload: {
        id: id
      }
    });
    handleReRender();
  };

  const handleChangeTask = (id) => {
    store.dispatch({
      type: "changeTask",
      payload: {
        id: id
      }
    });
    handleReRender();
  };

  useEffect(() => {
    updateTaskRef.current.focus();
    updateTaskRef.current.innerText = taskNameHtml;
  }, [stateValue]);

  const handleUpdateTask = (id) => {
    const tasks = store.getState();
    const index = tasks.findIndex((element) => element.id === id);
    const task = tasks[index];
    const updatedTaskName = updateTaskRef.current.innerText.trim();
    const { editStatus } = stateValue;
    if (updatedTaskName === task.name) {
      // No I18N
      alert("No changes found!");
      setStateValue({
        ...stateValue,
        editStatus: !editStatus,
        taskNameHtml: task.name
      });
    } else if (updatedTaskName === "") {
      // No I18N
      alert("Task name cannot be empty.");
      setStateValue({
        ...stateValue,
        editStatus: !editStatus,
        taskNameHtml: task.name
      });
    } else {
      setStateValue({
        ...stateValue,
        editStatus: !editStatus,
        taskNameHtml: updatedTaskName
      });
      store.dispatch({
        type: "updateTask",
        payload: {
          id: id,
          name: updatedTaskName,
          timeString: getFormattedDateTime(new Date()) + " (Modified) "
        }
      });
      handleReRender();
    }
  };

  const handleKeyPress = (event, id) => {
    if (event.key === "Enter" || event.key === "Escape") {
      handleUpdateTask(id);
    }
  };

  const getTaskLabelClasses = () => {
    const { editStatus } = stateValue;
    let classes = task.completed ? "taskNameClass completed" : "taskNameClass";
    if (editStatus) {
      classes += " editable";
    }
    return classes;
  };

  const { task } = props;
  const { taskNameHtml, editStatus } = stateValue;
  return (
    <div className="taskContainer">
      <li id={task.id}>
        <input
          type="checkbox"
          className="taskCheckboxClass"
          onChange={() => handleChangeTask(task.id)}
          checked={task.completed ? "checked" : ""}
        ></input>
        <label
          contentEditable={editStatus}
          className={getTaskLabelClasses()}
          ref={updateTaskRef}
          onBlur={() => handleUpdateTask(task.id)}
          onKeyDown={(event) => handleKeyPress(event, task.id)}
          suppressContentEditableWarning={true}
        >
          {taskNameHtml}
        </label>
        <br />
        <label className="dateStringClass">{task.timeString}</label>
        <button
          className="taskButtonClass edit"
          onClick={() => {
            setStateValue({ ...stateValue, editStatus: !editStatus });
            updateTaskRef.current.focus();
          }}
        >
          <i className="taskIconClass fas fa-pencil-alt"></i>
        </button>
        <button
          className="taskButtonClass remove"
          onClick={() => handleRemoveTask(task.id)}
        >
          <i className="taskIconClass fas fa-trash"></i>
        </button>
      </li>
    </div>
  );
}

export default TaskContainer;

TaskContainer.propTypes = {
  task: PropTypes.object,
  handleReRender: PropTypes.func
};
