import React from "react";
import { useSelector } from "react-redux";

import Landing from "../../components/Layout/Landing";

const LandingPage = () => {
  const { isAuth } = useSelector((state) => state.security);

  return <Landing isAuth={isAuth} />;
};

export default LandingPage;