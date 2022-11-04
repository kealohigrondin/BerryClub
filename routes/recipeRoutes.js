const passport = require("passport");
const mongoose = require("mongoose");

const requireLogin = require("../middlewares/requireLogin");
const Recipe = mongoose.model("recipes");
module.exports = (app) => {
  /**
   * PURPOSE: Create a recipe and add to db
   * input: takes in a recipe object {name: String, ingredients: [String], instruction: [String]}
   * output: user with ref to recipe just created, existing recipe, or current user if they already saved the recipe
   */
  app.post("/api/recipe", requireLogin, async (req, res) => {
    const { name, ingredients, instructions } = req.body;
    const existingRecipe = await Recipe.findOne({
      name,
      ingredients,
      instructions,
    });
    //add ref to existing recipe to the user that they don't already have
    if (existingRecipe && !req.user.recipes.includes(existingRecipe._id)) {
      req.user.recipes.push(existingRecipe._id);
    }
    //user already had recipe in their list, return existing user
    else if (existingRecipe && req.user.recipes.includes(existingRecipe._id)) {
      res.send(req.user);
    } else {
      //create recipe and add ref to that to user
      const recipe = new Recipe(req.body);
      console.log("INCOMING RECIPE", req.body);
      console.log("NEW RECIPE ADDED", recipe);
      recipe.save();
      req.user.recipes.push(recipe._id);

      //save user with updated reference to recipe
      const user = await req.user.save();
      res.send(user);
    }
  });

  /**
   * get all recipes for a user
   */
  app.get("/api/recipes", requireLogin, async (req, res) => {
    const fullRecipes = await Recipe.find({ _id: { $in: req.user.recipes } });

    res.send(fullRecipes);
  });

  /**
   * get one recipe by id
   */
  app.get("/api/recipe/:id", requireLogin, (req, res) => {});

  /**
   * remove recipeIDs from user if the recipe ID doesn't exist in recipe DB
   */
  app.get("/api/recipes/cleanlist", requireLogin, async (req, res) => {
    const recipeList = req.user.recipes;
    console.log(recipeList);
    const fullRecipes = await Recipe.find({
      _id: { $in: req.user.recipes },
    });
    const removedRecipes = await Recipe.

    res.send(fullRecipes);
  });
};
