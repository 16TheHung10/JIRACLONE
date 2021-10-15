import axios from "axios";
import { DOMAIN, TOKEN } from "../util/constants/settingSystem";

export const TaskService = {
  getTaskComment: (id) => {
    return axios(`${DOMAIN}/Comment/getAll?`, {
      params: { taskId: id },
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  addTaskComment: (payload) => {
    return axios.post(`${DOMAIN}/Comment/insertComment`, payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  getTaskDetail: (payload) => {
    return axios(`${DOMAIN}/Project/getTaskDetail?`, {
      params: { taskId: payload },
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  updateTaskDetail: (payload) => {
    return axios.post(`${DOMAIN}/Project/updateTask`, payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  updateCommentApi: ({ id, contentComment }) => {
    return axios({
      url: `${DOMAIN}/Comment/updateComment?id=${id}&contentComment=${contentComment}`,
      method: "PUT",
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  // updateCommentApi: ({ taskId, statusId }) => {
  //   return axios({
  //     url: `${DOMAIN}/Comment/updateComment?id=${id}&contentComment=${contentComment}`,
  //     method: "PUT",
  //     headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
  //   });
  // },
};
