import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Button,
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
              <ol>
                {recipe.instructions.map((instruction) => {
                  return <li key={instruction}>{instruction}</li>;
                })}
              </ol>
            </Grid>
            <Grid item xs={12} sm={4}>
              <h4>Ingredients</h4>
              <ul>
                {recipe.ingredients.map((ingredient) => {
                  return <li key={ingredient}>{ingredient}</li>;
                })}
              </ul>
              <Button
                variant="outlined"
                color="success"
                sx={{ float: "right" }}
              >
                Add to basket
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  });
}
export default RecipeList;
