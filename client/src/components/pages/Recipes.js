import requireAuth from "../HOCs/requireAuth";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RecipeList from "../RecipeList";

function Recipes() {
  const navigate = useNavigate();

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
      <RecipeList />
    </>
  );
}

export default requireAuth(Recipes);
