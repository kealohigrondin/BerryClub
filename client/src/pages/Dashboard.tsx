import React from 'react';
import { useAppSelector } from '../redux/hooks';

import requireAuth from '../components/HOCs/requireAuth';
import RecipeList from '../components/RecipeList';
import { fetchRecipeByUser } from '../utils/api';
import { useQuery } from '@tanstack/react-query';

function Dashboard() {
  const auth = useAppSelector((state) => state.auth);

  const recipes = useQuery({
    queryKey: ['fetchRecipeByUser', { userId: auth?.id }],
    queryFn: fetchRecipeByUser,
    retry: false,
  });
  if (!auth) {
    return <div className='ui active loader'></div>;
  }

  return (
    <>
      <h1>Secure Dashboard </h1>
      <p>Hello, {auth?.displayName}</p>
      <h2>My Recipes</h2>
      <RecipeList recipes={recipes} />
    </>
  );
}

export default requireAuth(Dashboard);
