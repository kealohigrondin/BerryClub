import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  TextField,
  Select,
  Box,
  MenuItem,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GET_CURRENT_USER } from "../actions/types";
import { UNITS } from "../CONSTANTS";

function RecipeCreateForm({ defaultValues, title }) {
  console.log(defaultValues);
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm({ defaultValues });
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    defaultValue: defaultValues?.ingredients,
    control,
  });
  const [displaySnackbar, setOpenSnackbar] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [ingredientCount, setIngredientCount] = useState(1);

  const onSubmit = async (data) => {
    //clean ingredients and instructions lists to be [String]
    const instructions = data.instructions
      .split("\n")
      .filter((str) => str !== "");
    const newRecipe = {
      name: data.name,
      ingredients: data.ingredients,
      instructions,
    };
    console.log(newRecipe);
    const res = await axios.post("/api/recipe", newRecipe);
    dispatch({ type: GET_CURRENT_USER, payload: res.data });
    console.log(res);
    if (res.status === 200) {
      setSendSuccess(true);
    } else {
      setSendSuccess(false);
    }
    setOpenSnackbar(true);
    reset();
  };

  useEffect(() => {
    if (ingredientCount > fields.length) {
      append({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientCount, defaultValues]);

  return (
    <>
      <Card raised>
        <CardContent>
          <h2>{title} a Recipe</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12}>
                <h4>Recipe Name</h4>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      defaultValue={defaultValues?.name}
                      placeholder="Enter recipe name"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      required
                    />
                  )}
                />
              </Grid>

              <Grid
                container
                item
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2 }}
              >
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4>Ingredients</h4>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        height: "24px",
                        width: "24px",
                      }}
                      onClick={() => {
                        setIngredientCount(ingredientCount + 1);
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </Box>
                </Grid>
                {fields.map((item, i) => (
                  // key must be item.id and remove must use i
                  //in order to properly remove the ingredient from the list
                  <React.Fragment key={item.id}>
                    <Grid item xs={6} sm={2}>
                      <Controller
                        name={`ingredients[${i}].quantity`}
                        defaultValue={
                          defaultValues
                            ? defaultValues.ingredients[i].quantity
                            : ""
                        }
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            placeholder="Enter quantity"
                            variant="outlined"
                            sx={{ width: "100%" }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <Controller
                        name={`ingredients[${i}].unit`}
                        defaultValue={
                          defaultValues ? defaultValues.ingredients[i].unit : ""
                        }
                        control={control}
                        render={({ field }) => (
                          <Select {...field} sx={{ width: "100%" }}>
                            {UNITS.map((unit) => (
                              <MenuItem key={unit} value={unit}>
                                {unit}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <Controller
                        name={`ingredients[${i}].name`}
                        defaultValue={
                          defaultValues ? defaultValues.ingredients[i].name : ""
                        }
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Enter name"
                            variant="outlined"
                            sx={{ width: "100%" }}
                            required
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3} sm={1}>
                      <Button
                        onClick={() => remove(i)}
                        variant="outlined"
                        color="error"
                        sx={{ marginTop: "0.75em" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>

              <Grid item xs={12}>
                <h4>Instructions</h4>
                <Controller
                  name="instructions"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Enter instructions"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      multiline
                      minRows={5}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="success" type="submit">
                  {title}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={displaySnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        {sendSuccess ? (
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Recipe successfully saved
          </Alert>
        ) : (
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Error saving recipe!
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

export default RecipeCreateForm;
