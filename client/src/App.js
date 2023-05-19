import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";

import { GET_CURRENT_USER } from "./actions/types";
import Nav from "./components/Nav";
import Welcome from "./components/pages/Welcome";
import Dashboard from "./components/pages/Dashboard";
import Recipes from "./components/pages/Recipes";
import RecipeCreate from "./components/pages/RecipeCreate";
import RecipeEdit from "./components/pages/RecipeEdit";
import Cart from "./components/pages/Cart";
import RecipeBrowse from "./components/pages/RecipeBrowse";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      //see if user is logged in with google already
      const res = await axios.get("/auth/current_user");
      dispatch({ type: GET_CURRENT_USER, payload: res.data });
    };
    getCurrentUser();
  });

  return (
    <div style={{ height: "100vh", background: "snow" }}>
      <Nav />
      <Container
        maxWidth="md"
        sx={{
          paddingTop: { xs: "2em", sm: "4em" },
          paddingLeft: { xs: "0.5em", sm: "1em" },
          paddingRight: { xs: "0.5em", sm: "1em" },
        }}
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/create" element={<RecipeCreate />} />
          <Route path="/recipe/edit/:recipeId" element={<RecipeEdit />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/recipes/browse" element={<RecipeBrowse />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
