import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./Sagas/rootSaga";
import { UserLoginReducer } from "./Reducer/UserLoginSaga/UserLoginReducer";
import { HistoryReducer } from "./Reducer/HistoryReducer";
import { ProjectCategoryReducer } from "./Reducer/ProjectCategoryReducer";
import { DrawerCyberBug } from "./Reducer/DwarerCyberBug";
import { ProjectReducer } from "./Reducer/ProjectReducer";
import { NotifiReducer } from "./Reducer/NotifiReducer";
import { TaskReducer } from "./Reducer/TaskReducer";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  UserLoginReducer,
  HistoryReducer,
  ProjectCategoryReducer,
  DrawerCyberBug,
  ProjectReducer,
  NotifiReducer,
  TaskReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middleWareSaga))
);
//Gọi saga
middleWareSaga.run(rootSaga);
export default store;
