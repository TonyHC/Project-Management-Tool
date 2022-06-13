import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { RequireAuth } from "./RequireAuth";

const LoginPage = React.lazy(() => import("../pages/public/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/public/RegisterPage"))
const LandingPage = React.lazy(() => import("../pages/public/LandingPage"));
const DashboardPage = React.lazy(() => import("../pages/private/DashboardPage"));
const ProjectFormPage = React.lazy(() => import("../pages/private/ProjectFormPage"));
const ProjectBoardPage = React.lazy(() => import("../pages/private/ProjectBoardPage"));
const ProjectTaskFormPage = React.lazy(() => import("../pages/private/ProjectTaskFormPage"));
const ResetPasswordPage = React.lazy(() => import("../pages/private/ResetPasswordPage"));
const NotFoundPage = React.lazy(() => import("../pages/public/NotFoundPage"));

const ReactRoutes = () => {
  const { isAuth } = useSelector((state) => state.security);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={isAuth ? <DashboardPage /> : <RegisterPage />} />
      <Route path="/login" element={isAuth ? <DashboardPage /> : <LoginPage />} />
      <Route element={<RequireAuth isAuth={isAuth} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/project-form" element={<ProjectFormPage />}>
          <Route path=":projectId" element={<ProjectFormPage />} />
        </Route>

        <Route path="/project-board/:projectId" element={<ProjectBoardPage />} />
        <Route path="/project-task-form/:projectId" element={<ProjectTaskFormPage />}>
          <Route path=":projectTaskSequence" element={<ProjectTaskFormPage />} />
        </Route>

        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ReactRoutes;