import { cuberbugService } from "../../../Service/CyberBugService";
import {
  CREATE_PROJECT_API,
  GET_CATEGORY_API,
  SET_CATEGORY,
} from "../../Constant";
import { takeLatest, call, put, delay } from "redux-saga/effects";
import { history } from "../../../util/history";
import * as ProjectSaga from "../../Sagas/CyberBug/ProjectCategorySaga";
function* getProjectCategory() {
  try {
    const { data } = yield call(cuberbugService.getCategory);
    yield put({ type: SET_CATEGORY, payload: data.content });
  } catch (err) {
    console.log(err);
  }
}
export function* followGetProjectCategory() {
  yield takeLatest(GET_CATEGORY_API, getProjectCategory);
}

function* createProject({ payload }) {
  try {
    yield call(() => cuberbugService.createProject(payload));
    alert("ADD PROJECT SUCCESS");
    yield history.push("/");
  } catch (err) {
    console.log(err);
  }
}
export function* followCreateProject() {
  yield takeLatest(CREATE_PROJECT_API, createProject);
}

function* getAllProject() {
  try {
    const { data } = yield call(cuberbugService.getAllProjectsAxios);
    yield put({ type: "SET_ALLPROJECT", payload: data.content });
  } catch (err) {
    console.log(err);
  }
}
export function* followGetAllProject() {
  yield takeLatest("GET_LIST_PROJECT_API", getAllProject);
}

function* getProjectDetail({ payload }) {
  try {
    const { data } = yield call(() =>
      cuberbugService.getProjectDetailAxios(payload)
    );
    yield put({ type: "SET_PROJECT_DETAIL", payload: data.content });
  } catch (err) {
    console.log(err);
  }
}
export function* followGetProjectDetail() {
  yield takeLatest("GET_PROJECT_DETAIL_API", getProjectDetail);
}

function* updateProject({ payload }) {
  try {
    yield call(() => cuberbugService.updateProject(payload));

    yield ProjectSaga.followGetAllProject();
    yield put({ type: "CLOSE_DRAWER" });
    yield delay(300);
    alert("UPDATE SUCCESS");
  } catch (err) {
    console.log("err update", err);
  }
}
export function* followUpdateProject() {
  yield takeLatest("UPDATE_PROJECT_API", updateProject);
}

function* deleteProject({ payload }) {
  try {
    yield call(() => cuberbugService.deleteProject(payload));
    yield put({ type: "GET_LIST_PROJECT_API" });
  } catch (err) {
    console.log(err);
  }
}
export function* followDeleteProject() {
  yield takeLatest("DELETE_PROJECT_API", deleteProject);
}
function* createTask({ payload }) {
  try {
    yield call(() => cuberbugService.createTask(payload.values));

    yield put({ type: "GET_LIST_PROJECT_API" });
    yield put({ type: "GET_PROJECT_DETAIL_API", payload: payload.projectId });
    yield put({ type: "CLOSE_DRAWER" });
    alert("CREATE TASK SUCCESS");
  } catch (err) {
    console.log(err);
  }
}
export function* followCreateTask() {
  yield takeLatest("CREATE_TASK_API", createTask);
}
function* getStatusList() {
  try {
    const { data } = yield call(cuberbugService.getStatusList);
    yield put({ type: "SET_STATUS_LIST", payload: data.content });
  } catch (err) {
    console.log(err);
  }
}
export function* followGetStatusList() {
  yield takeLatest("GET_STATUS_LIST_API", getStatusList);
}
