import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ProjectForm from "./components/project/ProjectForm";
import ProjectBoard from "./components/project-board/ProjectBoard";
import ProjectTaskForm from "./components/project-board/project-task/ProjectTaskForm";
import Layout from "./ui/Layout";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/dashboard" exact>
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
      </Switch>
    </Layout>
  );
};

export default App;