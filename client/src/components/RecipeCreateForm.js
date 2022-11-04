import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GET_CURRENT_USER } from "../actions/types";

function RecipeCreateForm() {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const onSubmit = async ({ name, ingredients, instructions }) => {
    //clean ingredients and instructions lists to be [String]
    ingredients = ingredients.split("\n").filter((str) => str !== "");
    instructions = instructions.split("\n").filter((str) => str !== "");

    const res = await axios.post("/api/recipe", {
      name,
      ingredients,
      instructions,
    });
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

  return (
    <>
      <Card raised>
        <CardContent>
          <h2>Create a Recipe</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={{ xs: 2, sm: 4 }} columnSpacing={4}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="name"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Recipe Name"
                      placeholder="Enter recipe name"
                      variant="outlined"
                      sx={{ width: "100%" }}
                      required
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="ingredients"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Ingredients"
                      placeholder="Enter ingredients"
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
                <Controller
                  name="instructions"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Instructions"
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
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "end" }}
              >
                <Button variant="contained" color="success" type="submit">
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        {sendSuccess ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Recipe successfully saved
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Error saving recipe!
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

export default RecipeCreateForm;
