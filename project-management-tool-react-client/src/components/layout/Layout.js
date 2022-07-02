import React from "react";

import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className="flex-wrapper">
      <Header />
      <main className="container">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;