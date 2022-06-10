import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import jwt_decode from "jwt-decode";

import Dashboard from "./components/Dashboard";
import ProjectForm from "./components/project/ProjectForm";
import ProjectBoard from "./components/project-board/ProjectBoard";
import ProjectTaskForm from "./components/project-board/project-task/ProjectTaskForm";
import Layout from "./components/layout/Layout";
import Landing from "./components/layout/Landing";
import Login from "./components/user-management/Login";
import Register from "./components/user-management/Register";
import { setJWTToken } from "./utils/setJWTToken";
import { logout } from "./store/security-actions";

const jwt = localStorage.getItem("jwt");
setJWTToken(jwt);

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();  

  useEffect(() => {
    if (jwt) {
      const decoded = jwt_decode(jwt);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime) {
        dispatch(logout(history));
      }
    }
  }, [dispatch, history]);

  return (
    <Layout>
    <Switch>
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route path="/dashboard" exact >
        <Dashboard />
      </Route>
      <Route path="/project-form" exact>
        <ProjectForm />
      </Route>
      <Route path="/project-form/:projectId" exact>
        <ProjectForm />
      </Route>
      <Route path="/project-board/:projectId" exact>
        <ProjectBoard />
      </Route>
      <Route path="/project-task-form/:projectId" exact>
        <ProjectTaskForm />
      </Route>
      <Route path="/project-task-form/:projectId/:projectTaskSequence" exact>
        <ProjectTaskForm />
      </Route>
      <Route path="/register" exact>
        <Register />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
    </Switch>
  </Layout>
  );
};

export default App;