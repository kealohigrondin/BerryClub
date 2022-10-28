import axios from "axios";
import { GET_CURRENT_USER, GET_RECIPES } from "./types";

export const getCurrentUser = () => async (dispatch) => {
  const res = await axios.get("/auth/current_user");
  dispatch({ type: GET_CURRENT_USER, payload: res.data });
};

export const getRecipeListByUser = () => async (dispatch) => {
  console.log("getting recipelist by user");
  const res = await axios.get("/api/recipes");
  dispatch({ type: GET_RECIPES, payload: res.data });
};
