import axios from 'axios';
import React, { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';

import { GET_CURRENT_USER } from './redux/store';
import Nav from './components/Nav';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Recipes from './pages/RecipesOwned';
import RecipeCreate from './pages/RecipeCreate';
import RecipeEdit from './pages/RecipeEdit';
import Cart from './pages/Cart';
import RecipeExplore from './pages/RecipeExplore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      //see if user is logged in with google already
      const res = await axios.get('/auth/current_user');
      dispatch({ type: GET_CURRENT_USER, payload: res.data });
    };
    getCurrentUser();
  });

  return (
    <div style={{ height: '100vh', background: 'snow' }}>
      <Nav />
      <Container
        maxWidth='md'
        sx={{
          paddingTop: { xs: '2em', sm: '4em' },
          paddingLeft: { xs: '0.5em', sm: '1em' },
          paddingRight: { xs: '0.5em', sm: '1em' },
        }}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/recipes' element={<Recipes />} />
            <Route path='/recipe/create' element={<RecipeCreate />} />
            <Route path='/recipe/edit/:recipeId' element={<RecipeEdit />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/explore' element={<RecipeExplore />} />
            <Route path='*' element={<p>Page not found</p>} />
          </Routes>
        </QueryClientProvider>
      </Container>
    </div>
  );
}

export default App;
