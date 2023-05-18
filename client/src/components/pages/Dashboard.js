import React from "react";
import { useSelector } from "react-redux";

import requireAuth from "../HOCs/requireAuth";
import RecipeList from "../RecipeList";

function Dashboard() {
  const auth = useSelector((state) => state.auth);

  if (!auth) {
    return <div className="ui active loader"></div>;
  }

  return (
    <>
      <h1>Secure Dashboard </h1>
      <p>Hello, {auth?.name?.givenName}</p>
      <h2>My Top Recipes</h2>
      <RecipeList />
    </>
  );
}

export default requireAuth(Dashboard);
