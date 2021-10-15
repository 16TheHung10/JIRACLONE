import { takeLatest, call, put, select, delay } from "redux-saga/effects";
import { TaskService } from "../../../Service/TaskService";

function* getTaskComment({ payload }) {
  const { data } = yield call(() => TaskService.getTaskComment(payload));
  yield put({ type: "SET_TASK_COMMENT", payload: data.content });
}
export function* followGetTaskComment() {
  yield takeLatest("GET_COMMENT_TASK_API", getTaskComment);
}
function* addTaskComment({ payload }) {
  yield call(() => TaskService.addTaskComment(payload));
  yield put({ type: "GET_COMMENT_TASK_API", payload: payload.taskId });
}
export function* followAddTaskComment() {
  yield takeLatest("ADD_TASK_COMMENT_API", addTaskComment);
}
function* getTaskDetail({ payload }) {
  const { data } = yield call(() => TaskService.getTaskDetail(payload));
  yield put({ type: "SET_TASK_DETAIL", payload: data.content });
}
export function* followGetTaskDetail() {
  yield takeLatest("GET_TASK_DETAIL_API", getTaskDetail);
}
function* updateTaskDetail({ payload }) {
  const { data } = yield call(() => TaskService.updateTaskDetail(payload));
  // yield put({ type: "SET_TASK_DETAIL", payload: data.content });
  console.log("saga update task", data);
}
export function* followUpdateTaskDetail() {
  yield takeLatest("UPDATE_TASK_DETAIL_API", updateTaskDetail);
}

function* handleChangePostApi({ actionType, payload, projectId }) {
  //ogij action làm thay đỏi taskDetail modal
  switch (actionType) {
    case "ADD_TASK_COMMENT_API_COMP":
      yield put({ type: "ADD_TASK_COMMENT_API", payload: payload });
    case "CHANGE_TASK":
      const { name, value } = payload;
      yield put({
        type: "CHANGE_TASK_RE",
        payload: { name: name, value: value },
      });
      yield put({ type: "GET_PROJECT_DETAIL_API", payload: projectId });
  }
  let { taskDetail } = yield select((state) => state.TaskReducer);
  let newListUserAsign = taskDetail.assigness?.map((item) => {
    return item.id;
  });
  const taskUpdate = { ...taskDetail, listUserAsign: newListUserAsign };
  try {
    const { data } = yield call(() => {
      return TaskService.updateTaskDetail(taskUpdate);
    });
    console.log("newListUserAsign", data);
  } catch (err) {
    console.log("err", err);
  }
}
export function* followHandleChangePostApi() {
  yield takeLatest("COMBINE_CHANGE_TASK", handleChangePostApi);
}

function* updateComment({ payload }) {
  try {
    const { data } = yield call(() => {
      return TaskService.updateCommentApi(payload);
    });
    yield put({ type: "GET_COMMENT_TASK_API", payload: data.content.taskId });
    console.log("saga", payload);
  } catch (err) {
    console.log(err);
  }
  // console.log("sga", payload);
}
export function* followUpdateComment() {
  yield takeLatest("UPDATE_COMMENT_API", updateComment);
}
function* deleteTask({ payload }) {
  try {
    yield call(() => {
      return TaskService.deleteTaskApi(payload.taskId);
    });
    yield put({ type: "GET_PROJECT_DETAIL_API", payload: payload.projectId });
    yield delay(600);
    yield alert("DELETE TASK SUCCESS");
  } catch (err) {
    console.log(err);
  }
  console.log("sga", payload);
}
export function* followDeleteTask() {
  yield takeLatest("DELETE_TASK_API", deleteTask);
}
