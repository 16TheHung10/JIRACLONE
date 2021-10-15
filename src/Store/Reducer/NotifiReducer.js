const initialState = {
  notify: false,
};

export const NotifiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "NOTIFICATION_ON":
      return { ...state, notify: true };
    case "NOTIFICATION_OF":
      return { ...state, notify: false };
    default:
      return state;
  }
};
