import React from "react";
import TaskContainer from "./taskContainer";
import PropTypes from "prop-types";
import store from "./../redux/reduxStore";

function TaskListContainer(props) {
  const tasks = store.getState();
  const { handleReRender } = props;

  const getPendingTasks = () => {
    const pendingTasks = tasks.filter((task) => task.completed === false);
    return pendingTasks;
  };

  const getCompletedTasks = () => {
    const completedTasks = tasks.filter((task) => task.completed === true);
    return completedTasks;
  };

  const { title, titleId, taskListType, classname } = props;
  const taskList =
    taskListType === "pendingTasks" ? getPendingTasks() : getCompletedTasks();
  return (
    <div className={`${classname} split`}>
      <label id={titleId}>{title}</label>
      <ul>
        {taskList.map((task) => (
          <TaskContainer
            key={task.id}
            task={task}
            handleReRender={handleReRender}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskListContainer;

TaskListContainer.propTypes = {
  title: PropTypes.string,
  titleId: PropTypes.string,
  taskListType: PropTypes.string,
  classname: PropTypes.string,
  handleReRender: PropTypes.func
};
