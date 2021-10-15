import axios from "axios";
import { DOMAIN, TOKEN } from "../util/constants/settingSystem";

export const UserService = {
  getUser: (keyword = "") => {
    return axios(`${DOMAIN}/Users/getUser?keyword=${keyword}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  assignUserProject: (InfoAdd) => {
    return axios.post(`${DOMAIN}/Project/assignUserProject`, InfoAdd, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  removeUserFromProject: (user) => {
    return axios.post(`${DOMAIN}/Project/removeUserFromProject`, user, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
};
