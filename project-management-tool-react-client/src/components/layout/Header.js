import React, { Fragment } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/security-actions";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.security);

  const logoutHandler = () => {
    dispatch(logout(history));
  };

  const authenticatedHeaderLinks = (
    <Fragment>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <div className="nav-link">
            <i className="fas fa-id-badge me-1"></i>
            {user.firstName} {user.lastName}
          </div>
        </li>
        <li className="nav-item logout" onClick={logoutHandler}>
          <Link className="nav-link" to="/logout">
            Logout
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  const notAuthenticatedHeaderLinks = (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link" to="/register">
          Sign Up
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink activeClassName="active" className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );

  let headerLinks = isAuth ? authenticatedHeaderLinks : notAuthenticatedHeaderLinks;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Project Management Tool
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          {headerLinks}
        </div>
      </div>
    </nav>
  );
};

export default Header;