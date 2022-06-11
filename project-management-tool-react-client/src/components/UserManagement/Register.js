import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { register } from "../../store/actions/security-actions";

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const history = useHistory();
  const dispatch = useDispatch();
  const { errors, isAuth } = useSelector((state) => state.security);

  useEffect(() => {
    if (isAuth) {
      history.replace("/dashboard");
    }
  }, [isAuth, history]);

  const submitHandler = (event) => {
    event.preventDefault();

    const newUser = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    dispatch(register({ newUser, history }));
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
                id="floatingInput"
                placeholder="Tom"
                ref={firstNameRef}
              />
              <label htmlFor="floatingInput">First Name</label>

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
                id="floatingInput"
                placeholder="Saws"
                ref={lastNameRef}
              />
              <label htmlFor="floatingInput">Last Name</label>

              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className={classNames("form-control", {
                  "is-invalid": errors.username,
                })}
                id="floatingInput"
                placeholder="name@example.com"
                ref={usernameRef}
              />
              <label htmlFor="floatingInput">Email address</label>

              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": errors.password,
                })}
                id="floatingInput"
                placeholder="password"
                ref={passwordRef}
              />
              <label htmlFor="floatingInput">Password</label>

              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": errors.confirmPassword,
                })}
                id="floatingInput"
                placeholder="password"
                ref={confirmPasswordRef}
              />
              <label htmlFor="floatingInput">Confirm Password</label>

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