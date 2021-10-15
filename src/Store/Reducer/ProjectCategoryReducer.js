import { SET_CATEGORY } from "../Constant";

const initialState = {
  category: [],
  projectList: [],
  taskType: [],
  priority: [],
};

export const ProjectCategoryReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SET_CATEGORY:
      state.category = payload;
      return { ...state };
    case "SET_ALLPROJECT":
      state.projectList = payload;
      return { ...state };
    case "SET_TASK_TYPE":
      return { ...state, taskType: payload };
    case "SET_PRIORITY":
      return { ...state, priority: payload };
    default:
      return state;
  }
};
