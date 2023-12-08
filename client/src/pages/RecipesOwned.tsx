import requireAuth from '../components/HOCs/requireAuth';
import AddIcon from '@mui/icons-material/Add';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipeByUser } from '../utils/api';
import { useAppSelector } from '../redux/hooks';

function Recipes() {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const recipes = useQuery({
    queryKey: ['fetchRecipeByUser', { userId: auth?.id }],
    queryFn: fetchRecipeByUser,
    retry: false,
  });
  return (
    <>
      <Box m={1} display='flex' justifyContent='space-between'>
        <h2>My Recipes</h2>
        <Button
          variant='contained'
          color='success'
          sx={{ height: '35px' }}
          onClick={() => navigate('/recipe/create')}>
          <AddIcon />
          <span style={{ paddingLeft: '0.5em' }}>Create Recipe</span>
        </Button>
      </Box>
      <RecipeList recipes={recipes} />
    </>
  );
}

export default requireAuth(Recipes);
