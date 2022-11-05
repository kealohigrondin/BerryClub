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
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GET_CURRENT_USER } from "../actions/types";

const UNITS = [
  "None",
  "g",
  "kg",
  "Tsp",
  "Tbsp",
  "cup",
  "pint",
  "quart",
  "gallon",
  "mL",
  "liter",
  "fluid oz",
  "oz",
  "lb",
];

function RecipeCreateForm() {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });
  const [displaySnackbar, setOpenSnackbar] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [ingredientCount, setIngredientCount] = useState(1);

  const onSubmit = async (data) => {
    //clean ingredients and instructions lists to be [String]
    // ingredients = ingredients.split("\n").filter((str) => str !== "");
    // instructions = instructions.split("\n").filter((str) => str !== "");
    console.log(data);
    // const res = await axios.post("/api/recipe", {
    //   name,
    //   ingredients,
    //   instructions,
    // });
    // dispatch({ type: GET_CURRENT_USER, payload: res.data });
    // console.log(res);
    // if (res.status === 200) {
    //   setSendSuccess(true);
    // } else {
    //   setSendSuccess(false);
    // }
    setOpenSnackbar(true);
    reset();
  };

  useEffect(() => {
    if (ingredientCount > fields.length) {
      append({});
    }
  }, [ingredientCount]);

  return (
    <>
      <Card raised>
        <CardContent>
          <h2>Create a Recipe</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12}>
                <h4>Recipe Name</h4>
                <Controller
                  name="name"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
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
                  <React.Fragment key={i}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name={`ingredients[${i}].name`}
                        defaultValue={""}
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
                    <Grid item xs={6} sm={3}>
                      <Controller
                        name={`ingredients[${i}].quantity`}
                        defaultValue={""}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            placeholder="Enter quantity"
                            variant="outlined"
                            sx={{ width: "100%" }}
                            required
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <Controller
                        name={`ingredients[${i}].unit`}
                        defaultValue={"None"}
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
                  Create
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
