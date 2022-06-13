import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { resetPassword } from "../../store/actions/security-actions";

const ResetPassword = () => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const history = useHistory();
  const dispatch = useDispatch();
  const { errors, user } = useSelector((state) => state.security);

  const submitHandler = (event) => {
    event.preventDefault();

    const updatedUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    dispatch(resetPassword({ updatedUser, history }));
  };

  return (
    <section className="col-md-4 mx-auto mt-5">
      <div className="card bg-light">
        <div className="card-body">
          <h5 className="card-title text-center display-6 mb-4">
            Reset Password
          </h5>

          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": errors.password,
                })}
                id="floatingInput"
                placeholder="Password"
                ref={passwordRef}
              />
              <label htmlFor="floatingInput">Password</label>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-floating">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": errors.confirmPassword,
                })}
                id="floatingPassword"
                placeholder="Password"
                ref={confirmPasswordRef}
              />
              <label htmlFor="floatingPassword">Confirm Password</label>
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
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

export default ResetPassword;