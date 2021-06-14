import React, { useEffect, useState } from "react";
import TaskListContainer from "./taskListContainer";
import InputContainer from "./inputContainer";
import todoImage from "./../../assets/images/todo.png";

function MainContainer() {
  const [flag, setFlag] = useState(true);

  const handleReRender = () => {
    setFlag((prevFlag) => !prevFlag);
  };

  return (
    <div className="rootContainer">
      <div className="topContainer">
        <div className="headerContainer">
          <div className="titleImageContainer">
            <img src={todoImage} alt="Todo"></img>
          </div>
          <div className="titleContainer">
            <h1>Todo Application</h1>
          </div>
        </div>
        <InputContainer handleReRender={handleReRender} />
      </div>
      <div id="taskContainer">
        <TaskListContainer
          title={"Pending List"}
          titleId={"pendingListTitle"}
          taskListType={"pendingTasks"}
          classname={"pendingContainer"}
          handleReRender={handleReRender}
        />
        <TaskListContainer
          title={"Completed List"}
          titleId={"completedListTitle"}
          taskListType={"completedTasks"}
          classname={"completedContainer"}
          handleReRender={handleReRender}
        />
      </div>
    </div>
  );
}

export default MainContainer;
