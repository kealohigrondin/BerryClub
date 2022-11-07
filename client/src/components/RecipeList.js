import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function RecipeList({ recipeList }) {
  const onChange = (e, expanded) => {
    //eventually only render the accordiondetails when the accordion is opened
  };
  return recipeList.map((recipe, index) => {
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
              <ol>
                {recipe.instructions.map((instruction, index) => {
                  return <li key={`${instruction}-${index}`}>{instruction}</li>;
                })}
              </ol>
            </Grid>
            <Grid item xs={12} sm={4}>
              <h4>Ingredients</h4>
              <ul>
                {recipe.ingredients.map((ingredient) => {
                  return (
                    <li key={ingredient.name}>
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    </li>
                  );
                })}
              </ul>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="success"
            sx={{ float: "right", marginBottom: "1.5em" }}
          >
            Add to basket
          </Button>
        </AccordionDetails>
      </Accordion>
    );
  });
}
export default RecipeList;
