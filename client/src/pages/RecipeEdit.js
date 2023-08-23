import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCreateForm from "../components/RecipeCreateForm";

function RecipeEdit() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(`/api/recipe/${recipeId}`);
      setRecipe(res.data);
    };
    fetchRecipe();
  }, [recipeId]);
  return recipe ? (
    <RecipeCreateForm defaultValues={recipe} title="Edit" />
  ) : (
    <p>loading</p>
  );
}

export default RecipeEdit;
