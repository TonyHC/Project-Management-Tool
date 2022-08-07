import React from "react";

const Alert = (props) => {
  return (
    <div
      className={`alert alert-${props.variant} alert-dismissible fade show`}
      role="alert">
      <i className="fas fa-exclamation-triangle mb-1 me-2"></i>
      <strong>{props.message}</strong>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
