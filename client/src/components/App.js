import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Container, useMediaQuery } from "@mui/material";
import Nav from "./Nav";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";

import { GET_CURRENT_USER } from "../actions/types";
import RecipeCreate from "./pages/RecipeCreate";
import { useTheme } from "@emotion/react";

function App(props) {
  const dispatch = useDispatch();
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints);

  useEffect(() => {
    const getCurrentUser = async () => {
      //see if user is logged in with google already
      const res = await axios.get("/auth/current_user");
      dispatch({ type: GET_CURRENT_USER, payload: res.data });
    };
    getCurrentUser();
    // console.log(matches);
  });

  return (
    <div style={{ height: "100vh", background: "snow" }}>
      <Nav />
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: { xs: "2em", sm: "4em" },
          paddingLeft: { xs: "0em", sm: "1em" },
          paddingRight: { xs: "0em", sm: "1em" },
        }}
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/create" element={<RecipeCreate />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
