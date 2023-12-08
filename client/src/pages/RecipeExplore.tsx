import React from 'react';
import RecipeList from '../components/RecipeList';

function RecipeExplore() {
  return (
    <>
      <h2>Explore Recipes</h2>
      <RecipeList recipeRoute='/api/recipes/all' />
    </>
  );
}
export default RecipeExplore;
