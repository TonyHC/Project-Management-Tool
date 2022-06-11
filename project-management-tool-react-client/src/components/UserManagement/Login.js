import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { login } from "../../store/actions/security-actions";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();
  const dispatch = useDispatch();
  const { errors, isAuth } = useSelector((state) => state.security);

  useEffect(() => {
    if (isAuth) {
      history.replace("/dashboard");
    }
  }, [isAuth, history]);

  console.log(errors);

  console.log(errors.type === "security/login/rejected");

  const submitHandler = (event) => {
    event.preventDefault();

    const loginRequest = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }

    dispatch(login({ loginRequest, history }));
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
                  "is-invalid": errors.username
                })}
                id="floatingInput"
                placeholder="name@example.com"
                ref={usernameRef}
              />
              <label htmlFor="floatingInput">Username</label>
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>

            <div className="form-floating">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": errors.password
                })}
                id="floatingPassword"
                placeholder="Password"
                ref={passwordRef}
              />
              <label htmlFor="floatingPassword">Password</label>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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