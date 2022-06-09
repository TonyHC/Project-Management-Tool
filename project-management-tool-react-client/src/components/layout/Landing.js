import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div class="px-4 py-5 my-5 text-center">
      <h1 class="display-5 fw-bold">Project Management Tool</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          Create your account to join active projects or start your own
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/register" class="btn btn-primary btn-lg px-4 gap-3">
            Sign Up
          </Link>
          <Link to="/login" class="btn btn-outline-secondary btn-lg px-4">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing