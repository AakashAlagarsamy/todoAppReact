import React, { useEffect, useState } from "react";
import TaskListContainer from "./taskListContainer";
import InputContainer from "./inputContainer";
import todoImage from "./../../assets/images/todo.png";
import store from "../redux/reduxStore";

function MainContainer() {
  const [flag, setFlag] = useState(true);

  const handleReRender = () => {
    setFlag((prevFlag) => !prevFlag);
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      handleReRender();
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
        <InputContainer />
      </div>
      <div id="taskContainer">
        <TaskListContainer
          title={"Pending List"}
          titleId={"pendingListTitle"}
          taskListType={"pendingTasks"}
          classname={"pendingContainer"}
        />
        <TaskListContainer
          title={"Completed List"}
          titleId={"completedListTitle"}
          taskListType={"completedTasks"}
          classname={"completedContainer"}
        />
      </div>
    </div>
  );
}

export default MainContainer;
