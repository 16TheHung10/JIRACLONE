import * as Cyberbug from "./CyberBug/CyberBugSaga";
import * as ProjectCategory from "./CyberBug/ProjectCategorySaga";
import * as TaskSaga from "./CyberBug/TaskSaga";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([
    //Nghieepj vụ cyberbug
    Cyberbug.followSignin(),
    Cyberbug.followGetUser(),
    Cyberbug.followRemoveUserIntoProject(),
    Cyberbug.followAddUserIntoProject(),
    Cyberbug.followGetTaskType(),
    Cyberbug.followGetPriority(),
    ProjectCategory.followGetProjectCategory(),
    ProjectCategory.followCreateProject(),
    ProjectCategory.followGetAllProject(),
    ProjectCategory.followUpdateProject(),
    ProjectCategory.followDeleteProject(),
    ProjectCategory.followGetProjectDetail(),
    ProjectCategory.followCreateTask(),
    ProjectCategory.followGetStatusList(),
    TaskSaga.followGetTaskComment(),
    TaskSaga.followAddTaskComment(),
    TaskSaga.followGetTaskDetail(),
    TaskSaga.followUpdateTaskDetail(),
    TaskSaga.followHandleChangePostApi(),
    TaskSaga.followUpdateComment(),
    TaskSaga.followDeleteTask(),
  ]);
}
