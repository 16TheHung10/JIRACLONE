import { USER_INFO } from "../../../util/constants/settingSystem";
import { SET_USER } from "../../Constant";

const initialState = {
  user: {},
  userSearch: [],
};
let userLocal = {};
if (localStorage.getItem(USER_INFO)) {
  userLocal = JSON.parse(localStorage.getItem(USER_INFO));
}

export const UserLoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      state.user = payload;
      return { ...state };
    case "SET_USER_SEARCH":
      return { ...state, userSearch: payload };
    default:
      state.user = userLocal;
      return state;
  }
};
