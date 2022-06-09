import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Project Management Tool</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Create your account to join active projects or start your own
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/register" className="btn btn-primary btn-lg px-4 gap-3">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing