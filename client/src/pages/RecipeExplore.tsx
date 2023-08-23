import React from "react";
import RecipeList from '../components/RecipeList';

function RecipeExplore() {
  return<>
   <p>hello from recipeExplore</p>
   <RecipeList recipeRoute="/api/recipes/all"/>
  </>
}
export default RecipeExplore;
