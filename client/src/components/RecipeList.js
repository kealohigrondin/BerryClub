import axios from "axios";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { convert } from "../utils/convert.ts";

function RecipeList() {
  const navigate = useNavigate();
  const currentUserId = useSelector((state) => state.auth?._id);
  const [recipeList, setRecipeList] = useState();
  const [loadError, setLoadError] = useState(false);

  const onChange = (e, expanded) => {
    //eventually only render the accordiondetails when the accordion is opened
  };

  const onAddToCart = async (ingredients) => {
    //convert each ingredient here to g or ml before passing to db
    for (let i = 0; i < ingredients.length; i++) {
      ingredients[i].quantity = convert(
        ingredients[i].quantity,
        ingredients[i].unit
      );
    }
    //add each ingredient to user's cart
    const res = await axios.post("/api/cart", ingredients);
    console.debug(res);
  };

  useEffect(() => {
    const getRecipes = async () => {
      axios.get("/api/recipes").then(
        (res) => {
          if (!recipeList) {
            setRecipeList(res.data);
          }
        },
        (error) => {
          setLoadError(true);
        }
      );
    };
    getRecipes();
  }, [recipeList]);

  if (loadError) {
    return <p>error loading recipes, please reload page</p>;
  }
  return (
    <>
      {recipeList && !loadError ? (
        recipeList.map((recipe, index) => {
          return (
            <Accordion key={recipe._id} onChange={onChange}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-content`}
              >
                <h3>{recipe.name}</h3>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <Grid item xs={12} sm={8}>
                    <h4>Instructions</h4>
                    <ol style={{ paddingLeft: "1.5em" }}>
                      {recipe.instructions.map((instruction, index) => {
                        return (
                          <li
                            key={`${instruction}-${index}`}
                            style={{ paddingBottom: "0.5em" }}
                          >
                            {instruction}
                          </li>
                        );
                      })}
                    </ol>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <h4>Ingredients</h4>
                    <ul>
                      {recipe.ingredients.map((ingredient) => {
                        return (
                          <li key={ingredient.name}>
                            {ingredient.quantity} {ingredient.unit}{" "}
                            {ingredient.name}
                          </li>
                        );
                      })}
                    </ul>
                  </Grid>
                </Grid>
                {recipe.creator === currentUserId ? (
                  <Button
                    variant="outlined"
                    color="warning"
                    sx={{
                      float: "right",
                      marginBottom: "1.5em",
                      marginLeft: "1em",
                    }}
                    onClick={() => navigate(`/recipe/edit/${recipe._id}`)}
                  >
                    Edit
                  </Button>
                ) : null}
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ float: "right", marginBottom: "1.5em" }}
                  onClick={() => {
                    onAddToCart(recipe.ingredients);
                  }}
                >
                  Add to cart
                </Button>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <div className="ui active loader"></div>
      )}
    </>
  );
}

export default RecipeList;
