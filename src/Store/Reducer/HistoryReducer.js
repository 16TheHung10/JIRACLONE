const historyState = {};

export const HistoryReducer = (state = historyState, { type, payload }) => {
  switch (type) {
    case "ADD_HISTORY":
      state = payload;
      return { ...state };

    default:
      return state;
  }
};
