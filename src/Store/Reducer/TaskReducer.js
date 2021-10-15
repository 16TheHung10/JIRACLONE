const initialState = {
  taskDetail: [],
  taskComment: [],
};

export const TaskReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_TASK_DETAIL":
      return { ...state, taskDetail: payload };
    case "SET_TASK_COMMENT":
      return { ...state, taskComment: payload.reverse() };
    case "CHANGE_TASK_RE":
      return {
        ...state,
        taskDetail: { ...state.taskDetail, [payload.name]: payload.value },
      };
    case "SET_ASSIGN_TASK_DETAIL":
      const newTaskDetail = { ...state.taskDetail };
      newTaskDetail.push(payload);
      return { ...state.taskDetail, ["assigness"]: newTaskDetail };
    default:
      return state;
  }
};
