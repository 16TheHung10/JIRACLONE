import axios from "axios";
import { DOMAIN, TOKEN } from "../util/constants/settingSystem";

export const cuberbugService = {
  signinCyberBug: (userInfo) => {
    return axios.post(`${DOMAIN}/Users/signin`, userInfo);
  },
  getCategory: () => {
    return axios(`${DOMAIN}/ProjectCategory`);
  },
  getProjectDetailAxios: (id) => {
    return axios(`${DOMAIN}/Project/getProjectDetail?`, {
      params: { id: id },
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  createProject: (projectInfo) => {
    return axios.post(`${DOMAIN}/Project/createProjectAuthorize`, projectInfo, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  updateProject: (projectInfo) => {
    return axios.put(`${DOMAIN}/Project/updateProject`, projectInfo, {
      params: { projectId: projectInfo.id },
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  getAllProjectsAxios: () => {
    return axios.get(`${DOMAIN}/Project/getAllProject`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  deleteProject: (projectId) => {
    return axios.delete(`${DOMAIN}/Project/deleteProject?`, {
      params: { projectId: projectId },
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
  getTaskType: () => {
    return axios(`${DOMAIN}/TaskType/getAll`);
  },
  getStatusList: () => {
    return axios(`${DOMAIN}/Status/getAll`);
  },
  getPriority: () => {
    return axios(`${DOMAIN}/Priority/getAll`);
  },
  createTask: (taskInfo) => {
    return axios.post(`${DOMAIN}/Project/createTask`, taskInfo, {
      headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` },
    });
  },
};
