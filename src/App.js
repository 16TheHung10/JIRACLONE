import "./App.css";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import UserLoginTemplate from "./Templates/UserLoginTemplate";
import Login from "./View/Login";
import Home from "./View/Home";

import Profile from "./View/Profile/Profile";
import { history } from "./util/history";
import HomeTemplate from "./Templates/HomeTemplate";
import CreateProject from "./View/CreateProject/CreateProject";
import Test from "./View/Test/Test";
import ProjectManager from "./View/ProjectManger/ProjectManager";
import ModalCyberBug from "./HOC/ModalCyberBug";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import DemoDrapDrop from "./View/DemoDragDrop/DemoDrapDrop";
import DemoDragDnd from "./View/DemoDragDND/DemoDragDnd";

function App() {
  const { notify } = useSelector((state) => state.NotifiReducer);
  const notifyToast = () => toast("Wow so easy !");
  // if (notify) {
  //   return notifyToast();
  // }
  //Bên dưới là cách fix history dùng reducer
  // const dispatch = useDispatch();
  // const history = useHistory();
  // useEffect(() => {
  //   dispatch({ type: "ADD_HISTORY", payload: history });
  // }, []);
  return (
    <>
      <ModalCyberBug />
      <ToastContainer />
      <Router history={history}>
        <Switch>
          <Redirect exact from="/" to="/project/manager" />
          <HomeTemplate exact path="/dragdrop" Component={DemoDrapDrop} />
          <HomeTemplate exact path="/dragdropdnd" Component={DemoDragDnd} />
          <HomeTemplate
            exact
            path="/project/manager"
            Component={ProjectManager}
          />
          <HomeTemplate
            exact
            path="/project/detail/:projectId"
            Component={Home}
          />
          <HomeTemplate
            exact
            path="/project/create"
            Component={CreateProject}
          />
          <HomeTemplate exact path="/test" Component={Test} />
          <HomeTemplate
            exact
            path="/project/manager"
            Component={ProjectManager}
            toast={notifyToast}
          />
          <Route exact path="/profile" component={Profile} />
          <UserLoginTemplate exact path="/login" Component={Login} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
