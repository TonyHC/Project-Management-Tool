import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { register } from "../../store/actions/security-actions";

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.security);

  const submitHandler = (event) => {
    event.preventDefault();

    const newUser = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    dispatch(register({ newUser, navigate }));
  };

  return (
    <section className="col-md-4 mx-auto mt-5">
      <div className="card bg-light">
        <div className="card-body">
          <h5 className="card-title text-center display-6 mb-4">Register</h5>

          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.firstName,
                })}
                id="floatingFirstName"
                placeholder="Dummy"
                ref={firstNameRef}
              />
              <label htmlFor="floatingFirstName">First Name</label>

              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.lastName,
                })}
                id="floatingLastName"
                placeholder="Testing"
                ref={lastNameRef}
              />
              <label htmlFor="floatingLastName">Last Name</label>

              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className={classNames("form-control", {
                  "is-invalid": errors.username && errors.type === "register",
                })}
                id="floatingEmail"
                placeholder="name@example.com"
                ref={usernameRef}
              />
              <label htmlFor="floatingEmail">Email address</label>

              {errors.username && errors.type === "register" && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": errors.password && errors.type === "register",
                })}
                id="floatingPassword"
                placeholder="password"
                ref={passwordRef}
              />
              <label htmlFor="floatingPassword">Password</label>

              {errors.password && errors.type === "register" && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": errors.confirmPassword,
                })}
                id="floatingConfirmPassword"
                placeholder="password"
                ref={confirmPasswordRef}
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>

              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-block mt-2">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;