import { takeLatest, call, put } from "redux-saga/effects";
import { cuberbugService } from "../../../Service/CyberBugService";
import { UserService } from "../../../Service/UserService";
import { TOKEN, USER_INFO } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { SET_USER, USER_SIGN_API } from "../../Constant";
import * as ProjectSaga from "../../Sagas/CyberBug/ProjectCategorySaga";
//quản lý các aciton saga. từ comp gửi lên saga rồi từ saga mới gửi lên store
function* signin(action) {
  //Gọi api chỗ này
  try {
    const { data, status } = yield call(() =>
      cuberbugService.signinCyberBug(action.payload)
    );
    if (status === 200) {
      localStorage.setItem(TOKEN, data.content.accessToken);
      localStorage.setItem(USER_INFO, JSON.stringify(data.content)); //local không lưu object được nên phải đưa về dạng chuỗi
      yield put({ type: SET_USER, payload: data });

      //Bên dưới là cách fix history dùng reducer
      // let HistoryReducer = yield select((state) => {
      //   //select gioongs như useSelector
      //   return state.HistoryReducer;
      // });
      // HistoryReducer.push("/");

      history.push("/");
    }
  } catch (err) {
    console.log(err);
  }
}
export function* followSignin() {
  yield takeLatest(USER_SIGN_API, signin);
}

function* getUser({ payload }) {
  try {
    const { data } = yield call(() => UserService.getUser(payload));
    yield put({ type: "SET_USER_SEARCH", payload: data.content });
  } catch (err) {
    console.log(err);
  }
}
export function* followGetUser() {
  yield takeLatest("GET_USER_API", getUser);
}

function* addUserIntoProject({ payload }) {
  try {
    yield call(() => UserService.assignUserProject(payload));
    yield put({ type: "GET_LIST_PROJECT_API" });
    yield ProjectSaga.followGetAllProject();
  } catch (err) {
    alert(err.response.data.content);
  }
}
export function* followAddUserIntoProject() {
  yield takeLatest("ADD_USER_PROJECT_API", addUserIntoProject);
}

function* removeUserFromProject({ payload }) {
  try {
    yield call(() => UserService.removeUserFromProject(payload));
    alert("DELETE SUCCESS");
    yield ProjectSaga.followGetAllProject();
    // yield put({ type: "GET_LIST_PROJECT_API" });
  } catch (err) {
    console.log(err);
  }
}
export function* followRemoveUserIntoProject() {
  yield takeLatest("REMOVE_USER_PROJECT_API", removeUserFromProject);
}

function* getTaskType() {
  try {
    const { data } = yield call(cuberbugService.getTaskType);

    yield put({ type: "SET_TASK_TYPE", payload: data.content });
  } catch (err) {
    console.log(err);
  }
}
export function* followGetTaskType() {
  yield takeLatest("GET_TASK_TYPE_API", getTaskType);
}
function* getPriority() {
  try {
    const { data } = yield call(cuberbugService.getPriority);

    yield put({ type: "SET_PRIORITY", payload: data.content });
  } catch (err) {
    console.log(err);
  }
}
export function* followGetPriority() {
  yield takeLatest("GET_PRIORITY_API", getPriority);
}
