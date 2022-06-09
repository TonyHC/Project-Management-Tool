import React from "react";
import Header from "./Header";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <main className="container">{props.children}</main>
    </div>
  );
};

export default Layout;