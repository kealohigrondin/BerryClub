import axios from "axios";
import { useEffect, useState } from "react";
import requireAuth from "../HOCs/requireAuth";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RecipeList from "../RecipeList";

function Recipes() {
  const [recipeList, setRecipeList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipes = async () => {
      const res = await axios.get("/api/recipes");
      if (res && !recipeList) {
        setRecipeList(res.data);
      }
    };
    getRecipes();
  }, [recipeList]);

  return (
    <>
      <Box m={1} display="flex" justifyContent="space-between">
        <h2>My Recipes</h2>
        <Button
          variant="contained"
          color="success"
          sx={{ height: "35px" }}
          onClick={() => navigate("/recipe/create")}
        >
          <AddIcon />
          <span style={{ paddingLeft: "0.5em" }}>Create Recipe</span>
        </Button>
      </Box>
      {recipeList ? (
        <RecipeList recipeList={recipeList} />
      ) : (
        <div className="ui active loader"></div>
      )}
    </>
  );
}

export default requireAuth(Recipes);
