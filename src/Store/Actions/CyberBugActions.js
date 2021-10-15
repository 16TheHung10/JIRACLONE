import { USER_SIGN_API } from "../Constant";

export const loginCyberBugAction = (infoLogin) => {
  return { type: USER_SIGN_API, payload: infoLogin };
};
