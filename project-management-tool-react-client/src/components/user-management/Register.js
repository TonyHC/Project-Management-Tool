import React from "react";

const Register = () => {
  return (
    <section className="col-md-4 mx-auto mt-5">
      <div class="card bg-light">
        <div class="card-body">
          <h5 class="card-title text-center display-6 mb-4">Register</h5>

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Tom"
            />
            <label for="floatingInput">First Name</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Saws"
            />
            <label for="floatingInput">Last Name</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingInput"
              placeholder="password"
            />
            <label for="floatingInput">Password</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingInput"
              placeholder="password"
            />
            <label for="floatingInput">Confirm Password</label>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-block mt-2">
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
