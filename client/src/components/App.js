import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Nav from "./Nav";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";

import { GET_CURRENT_USER } from "../actions/types";

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
    <div style={{ height: "100vh", background: "darkslateblue" }}>
      <Nav />
      <div className="ui container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
