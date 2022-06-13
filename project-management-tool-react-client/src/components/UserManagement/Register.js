import React, { useRef } from "react";
import classNames from "classnames";

const Register = (props) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const newUser = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    props.onRegister(newUser);
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
                  "is-invalid": props.errors.firstName,
                })}
                id="floatingFirstName"
                placeholder="Dummy"
                ref={firstNameRef}
              />
              <label htmlFor="floatingFirstName">First Name</label>

              {props.errors.firstName && (
                <div className="invalid-feedback">{props.errors.firstName}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": props.errors.lastName,
                })}
                id="floatingLastName"
                placeholder="Testing"
                ref={lastNameRef}
              />
              <label htmlFor="floatingLastName">Last Name</label>

              {props.errors.lastName && (
                <div className="invalid-feedback">{props.errors.lastName}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className={classNames("form-control", {
                  "is-invalid": props.errors.username && props.errors.type === "register",
                })}
                id="floatingEmail"
                placeholder="name@example.com"
                ref={usernameRef}
              />
              <label htmlFor="floatingEmail">Email address</label>

              {props.errors.username && props.errors.type === "register" && (
                <div className="invalid-feedback">{props.errors.username}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": props.errors.password && props.errors.type === "register",
                })}
                id="floatingPassword"
                placeholder="password"
                ref={passwordRef}
              />
              <label htmlFor="floatingPassword">Password</label>

              {props.errors.password && props.errors.type === "register" && (
                <div className="invalid-feedback">{props.errors.password}</div>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={classNames("form-control", {
                  "is-invalid": props.errors.confirmPassword,
                })}
                id="floatingConfirmPassword"
                placeholder="password"
                ref={confirmPasswordRef}
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>

              {props.errors.confirmPassword && (
                <div className="invalid-feedback">{props.errors.confirmPassword}</div>
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

export default React.memo(Register);