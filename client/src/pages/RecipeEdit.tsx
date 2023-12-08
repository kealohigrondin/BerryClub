import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCreateForm from '../components/RecipeCreateForm';
import { Recipe } from '../models/recipe';
import { fetchRecipeById } from '../utils/api';
import { useQuery } from '@tanstack/react-query';

function RecipeEdit() {
  const { recipeId } = useParams();

  const recipe = useQuery({
    queryKey: ['fetchRecipeById', { recipeId }],
    queryFn: fetchRecipeById,
    retry: false,
  });

  if (recipe.isLoading) return <p>loading...</p>;
  if (recipe.isError) return <p>{recipe.error.message}</p>;
  if (recipe.data)
    return <RecipeCreateForm defaultValues={recipe.data} title='Edit' />;

  return <p>unhandled error</p>;
}

export default RecipeEdit;
