import axios from "axios";
import { useEffect, useState } from "react";
import requireAuth from "../HOCs/requireAuth";

function Recipes() {
  const [recipeList, setRecipeList] = useState();
  useEffect(() => {
    const getRecipes = async () => {
      const res = await axios.get("/api/recipes");
      if (res && !recipeList) {
        setRecipeList(res.data);
        console.log("loaded true");
      }
    };
    getRecipes();
    console.log(recipeList);
  }, [recipeList]);

  return (
    <>
      <h2>My Recipes</h2>
      <div>
        {recipeList ? (
          recipeList.map((recipe) => {
            return (
              <div key={recipe._id}>
                <h4>{recipe.name}</h4>
                <div>
                  {recipe.instructions.map((instruction) => {
                    return <p key={instruction}>{instruction}</p>;
                  })}
                </div>
                <div>
                  {recipe.ingredients.map((ingredient) => {
                    return <p key={ingredient}>{ingredient}</p>;
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="ui active loader"></div>
        )}
      </div>
    </>
  );
}

export default requireAuth(Recipes);
