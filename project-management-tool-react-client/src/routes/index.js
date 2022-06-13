import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Landing from "../components/Layout/Landing";
import Dashboard from "../components/Project/Dashboard";
import ProjectForm from "../components/Project/ProjectForm";
import ProjectBoard from "../components/ProjectBoard/ProjectBoard";
import ProjectTaskForm from "../components/ProjectBoard/ProjectTask/ProjectTaskForm";
import Login from "../components/UserManagement/Login";
import Register from "../components/UserManagement/Register";
import ResetPassword from "../components/UserManagement/ResetPassword";
import { RequireAuth } from "./RequireAuth";

const ReactRoutes = () => {
  const { isAuth } = useSelector((state) => state.security);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={isAuth ? <Dashboard /> : <Register />} />
      <Route path="/login" element={isAuth ? <Dashboard /> : <Login />} />
      <Route element={<RequireAuth isAuth={isAuth} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project-form" element={<ProjectForm />}>
          <Route path=":projectId" element={<ProjectForm />} />
        </Route>

        <Route path="/project-board/:projectId" element={<ProjectBoard />} />
        <Route path="/project-task-form/:projectId" element={<ProjectTaskForm />}>
          <Route path=":projectTaskSequence" element={<ProjectTaskForm />} />
        </Route>

        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default ReactRoutes;