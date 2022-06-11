import React from 'react'
import { Route, Switch } from "react-router-dom";

import Landing from "../components/Layout/Landing";
import Login from "../components/UserManagement/Login";
import Register from "../components/UserManagement/Register";
import Dashboard from "../components/Project/Dashboard";
import ProjectForm from "../components/Project/ProjectForm";
import ProjectBoard from "../components/ProjectBoard/ProjectBoard";
import ProjectTaskForm from "../components/ProjectBoard/ProjectTask/ProjectTaskForm";
import ProtectedRoute from "./ProtectedRoute";

export const createRoutes = (
    <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

        <ProtectedRoute path="/dashboard" component={Dashboard} exact />
        <ProtectedRoute path="/project-form" component={ProjectForm} exact />
        <ProtectedRoute path="/project-form/:projectId" component={ProjectForm} exact />
        <ProtectedRoute path="/project-board/:projectId" component={ProjectBoard} exact />
        <ProtectedRoute path="/project-task-form/:projectId" component={ProjectTaskForm} exact />
        <ProtectedRoute path="/project-task-form/:projectId/:projectTaskSequence" component={ProjectTaskForm} exact />
  </Switch>
);