import { actionTypes } from "./actionTypes";

const addTask = (name, timeString) => ({
  type: actionTypes.ADD_TASK,
  payload: { name, timeString }
});

const removeTask = (id) => ({
  type: actionTypes.REMOVE_TASK,
  payload: { id }
});

const changeTask = (id) => ({
  type: actionTypes.CHANGE_TASK,
  payload: { id }
});

const updateTask = (id, name, timeString) => ({
  type: actionTypes.UPDATE_TASK,
  payload: { id, name, timeString }
});

export { addTask, removeTask, changeTask, updateTask };
