import React from "react";

const Login = () => {
  return (
    <section className="col-md-4 mx-auto mt-5">
      <div class="card bg-light">
        <div class="card-body">
          <h5 class="card-title text-center display-6 mb-4">Login</h5>

          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>

          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-block mt-4">
              Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;