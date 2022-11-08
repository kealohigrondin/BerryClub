import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCreateForm from "../RecipeCreateForm";

function RecipeEdit() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    console.log(recipeId);
    const fetchRecipe = async () => {
      const res = await axios.get(`/api/recipe/${recipeId}`);
      console.log(res.data);
      setRecipe(res.data);
    };
    fetchRecipe();
  }, []);
  return <RecipeCreateForm defaultValues={recipe} title="Edit" />;
}

export default RecipeEdit;
