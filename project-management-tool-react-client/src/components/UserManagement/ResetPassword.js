import React, { useRef } from "react";
import classNames from "classnames";

import classes from "./ResetPassword.module.css";

const ResetPassword = (props) => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const updatedUser = {
      id: props.user.id,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      username: props.user.username,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    props.onResetPassword(updatedUser);
  };

  return (
    <section className="col-md-4 mx-auto mt-5">
      <div className="card bg-light">
        <div className="card-body">
          <h5 className="card-title text-center display-6 mb-4">
            Reset Password
          </h5>

          <form onSubmit={submitHandler}>
            {props.errors.invalidResetPassword && (
                <div className={classes["invalid-password"]}>
                  <p>{props.errors.invalidResetPassword}</p>
                </div>
            )}

            <div className="form-floating mb-3">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": props.errors.password || props.errors.invalidResetPassword,
                })}
                id="floatingInput"
                placeholder="Password"
                ref={passwordRef}
              />
              <label htmlFor="floatingInput">Password</label>
              {props.errors.password && (
                <div className="invalid-feedback">{props.errors.password}</div>
              )}
            </div>

            <div className="form-floating">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": props.errors.confirmPassword || props.errors.invalidResetPassword,
                })}
                id="floatingPassword"
                placeholder="Password"
                ref={confirmPasswordRef}
              />
              <label htmlFor="floatingPassword">Confirm Password</label>
              {props.errors.confirmPassword && (
                <div className="invalid-feedback">{props.errors.confirmPassword}</div>
              )}
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ResetPassword);