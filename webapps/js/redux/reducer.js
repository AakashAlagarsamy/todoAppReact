import { generateTaskId } from "../utils/utils";

export default function reducer(state = [], action) {
  switch (action.type) {
    case "addTask":
      return [
        ...state,
        {
          id: generateTaskId(),
          name: action.payload.name,
          completed: false,
          timeString: action.payload.timeString
        }
      ];
    case "removeTask":
      return state.filter((task) => task.id !== action.payload.id);
    case "changeTask": {
      const index = state.findIndex((task) => task.id === action.payload.id);
      state[index].completed = !state[index].completed;
      return state;
    }
    case "updateTask": {
      const taskIndex = state.findIndex(
        (task) => task.id === action.payload.id
      );
      state[taskIndex] = {
        ...state[taskIndex],
        name: action.payload.name,
        timeString: action.payload.timeString
      };
      return state;
    }
    default:
      return state;
  }
}
