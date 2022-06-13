import React, { Fragment } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/actions/security-actions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.security);

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  const authenticatedHeaderLinks = (
    <Fragment>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
      <div className="dropdown ms-auto mb-2 mb-lg-0">
        <button
          className="btn btn-outline-light dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-id-badge me-1"></i>
          {user.firstName} {user.lastName}
        </button>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li>
              <h6 className="dropdown-header">{user.username}</h6>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li className="dropdown-item dropdown-menu-dark">
            <Link to="/reset-password">
              <i className="fas fa-key me-1"></i> Reset Password
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li className="dropdown-item" onClick={logoutHandler}>
            <Link to="/logout">
              <i className="fas fa-sign-out-alt me-1"></i> Logout
            </Link>
          </li>
        </ul>
      </div>
    </Fragment>
  );

  const notAuthenticatedHeaderLinks = (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" to="/register">
          Sign Up
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );

  let headerLinks = isAuth
    ? authenticatedHeaderLinks
    : notAuthenticatedHeaderLinks;

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