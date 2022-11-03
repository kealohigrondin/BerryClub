import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function RecipeList({ recipeList }) {
  return recipeList.map((recipe, index) => {
    return (
      <Accordion key={recipe._id}>
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
              {recipe.instructions.map((instruction) => {
                return <p key={instruction}>{instruction}</p>;
              })}
            </Grid>
            <Grid item xs={12} sm={4}>
              <h4>Ingredients</h4>
              {recipe.ingredients.map((ingredient) => {
                return <p key={ingredient}>{ingredient}</p>;
              })}
              <Button>Add to cart</Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  });
}
export default RecipeList;
