import React, { useRef } from "react";
import classNames from "classnames";

const Login = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const loginRequest = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    };

    props.onLogin(loginRequest);
  }

  return (
    <section className="col-md-4 mx-auto mt-5">
      <div className="card bg-light">
        <div className="card-body">
          <h5 className="card-title text-center display-6 mb-4">Login</h5>

          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className={classNames("form-control", {
                  "is-invalid": props.errors.username && props.errors.type === "login"
                })}
                id="floatingUsername"
                placeholder="name@example.com"
                ref={usernameRef}
              />
              <label htmlFor="floatingUsername">Username</label>
              {props.errors.username && props.errors.type === "login" && <div className="invalid-feedback">{props.errors.username}</div>}
            </div>

            <div className="form-floating">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": props.errors.password && props.errors.type === "login"
                })}
                id="floatingPassword"
                placeholder="Password"
                ref={passwordRef}
              />
              <label htmlFor="floatingPassword">Password</label>
              {props.errors.password && props.errors.type === "login" && <div className="invalid-feedback">{props.errors.password}</div>}
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;