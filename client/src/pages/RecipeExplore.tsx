import React from 'react';
import RecipeList from '../components/RecipeList';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipeAll } from '../utils/api';

function RecipeExplore() {
  const recipes = useQuery({
    queryKey: ['fetchRecipeAll'],
    queryFn: fetchRecipeAll,
    retry: false,
  });
  return (
    <>
      <h2>Explore Recipes</h2>
      <RecipeList recipes={recipes} />
    </>
  );
}
export default RecipeExplore;
