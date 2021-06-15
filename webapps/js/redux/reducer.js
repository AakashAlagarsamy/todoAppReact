import { generateTaskId } from "../utils/utils";
import { actionTypes } from "./actionTypes";

export default function reducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return [
        ...state,
        {
          id: generateTaskId(),
          name: action.payload.name,
          completed: false,
          timeString: action.payload.timeString
        }
      ];
    case actionTypes.REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload.id);
    case actionTypes.CHANGE_TASK: {
      return state.map((task) =>
        task.id !== action.payload.id
          ? task
          : { ...task, completed: !task.completed }
      );
    }
    case actionTypes.UPDATE_TASK: {
      return state.map((task) =>
        task.id !== action.payload.id
          ? task
          : {
              ...task,
              name: action.payload.name,
              timeString: action.payload.timeString
            }
      );
    }
    default:
      return state;
  }
}
