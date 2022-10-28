import React from "react";
import { useSelector } from "react-redux";

import requireAuth from "../HOCs/requireAuth";

function Dashboard() {
  const auth = useSelector((state) => state.auth);

  if (!auth) {
    return <div className="ui active loader"></div>;
  }

  return (
    <>
      <h1>Secure Dashboard </h1>
      <p>Hello, {auth?.name.givenName}</p>
    </>
  );
}

export default requireAuth(Dashboard);
