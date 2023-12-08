import React from "react";
import { useAppSelector } from "../redux/hooks";

import requireAuth from "../components/HOCs/requireAuth";
import RecipeList from "../components/RecipeList";

function Dashboard() {
  const auth = useAppSelector((state) => state.auth);

  if (!auth) {
    return <div className="ui active loader"></div>;
  }

  return (
    <>
      <h1>Secure Dashboard </h1>
      <p>Hello, {auth?.displayName}</p>
      <h2>My Recipes</h2>
      <RecipeList recipeRoute="/api/recipes" />
    </>
  );
}

export default requireAuth(Dashboard);
