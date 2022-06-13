import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import LandingPage from "../pages/public/LandingPage";
import DashboardPage from "../pages/private/DashboardPage";
import ProjectFormPage from "../pages/private/ProjectFormPage";
import ProjectBoardPage from "../pages/private/ProjectBoardPage";
import ProjectTaskFormPage from "../pages/private/ProjectTaskFormPage";
import ResetPasswordPage from "../pages/private/ResetPasswordPage";
import NotFoundPage from "../pages/public/NotFoundPage";

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