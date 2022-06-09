import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ProjectForm from "./components/project/ProjectForm";
import ProjectBoard from "./components/project-board/ProjectBoard";
import ProjectTaskForm from "./components/project-board/project-task/ProjectTaskForm";
import Layout from "./components/layout/Layout";
import Landing from "./components/layout/Landing";
import Login from "./components/user-management/Login";
import Register from "./components/user-management/Register";

const App = () => {
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