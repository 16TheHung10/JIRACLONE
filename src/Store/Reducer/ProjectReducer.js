const initialState = {
  projectEdit: {
    id: 0,
    projectName: "nam",
    creator: 2,
    description: "nam",
    categoryId: 1,
  },
  projectDetail: {},
  statusList: [],
};

export const ProjectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "EDIT_PROJECT": {
      state.projectEdit = payload;
      return { ...state };
    }
    case "SET_PROJECT_DETAIL":
      return { ...state, projectDetail: payload };
    case "SET_STATUS_LIST":
      return { ...state, statusList: payload };
    default:
      return state;
  }
};
