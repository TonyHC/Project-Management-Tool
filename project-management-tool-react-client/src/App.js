import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import ProjectForm from "./components/project/ProjectForm";
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
      </Switch>
    </Layout>
  );
}

export default App;