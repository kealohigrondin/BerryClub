import axios from 'axios';
import { Recipe } from '../models/recipe';

export const fetchRecipeByUser = async ({ queryKey }) => {
  const [_key] = queryKey;
  const res = await axios.get('api/recipes');
  if (res.status === 200) return res.data as Recipe[];
  else throw new Error(`error on ${_key}`);
};
export const fetchRecipeById = async ({ queryKey }) => {
  const [_key, { recipeId }] = queryKey;
  const res = await axios.get(`/api/recipe/${recipeId}`);
  if (res.status === 200) return res.data as Recipe;
  else throw new Error(`error on ${_key}`);
};
export const fetchRecipeAll = async ({ queryKey }) => {
  const [_key] = queryKey;
  const res = await axios.get('api/recipes/all');
  if (res.status === 200) return res.data as Recipe[];
  else throw new Error(`error on ${_key}`);
};
