import React from "react";
import RecipeCreateForm from "../components/RecipeCreateForm";
import { emptyRecipe } from "../models/recipe";

function RecipeCreate() {
  return <RecipeCreateForm title="Create" defaultValues={emptyRecipe} />;
}
export default RecipeCreate;
