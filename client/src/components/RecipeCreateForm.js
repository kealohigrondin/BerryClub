import React from "react";
import Rating from "@mui/material/Rating";
import {
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
  CardHeader,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GET_CURRENT_USER } from "../actions/types";

function RecipeCreateForm() {
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ name, ingredients, instructions }) => {
    //clean ingredients and instructions lists to be [String]
    console.log({ name, ingredients, instructions });
    ingredients = ingredients.split("\n");
    instructions = instructions.split("\n");
    console.log({ name, ingredients, instructions });
    const res = await axios.post("/api/recipe", {
      name,
      ingredients,
      instructions,
    });
    console.log(res);
    dispatch({ type: GET_CURRENT_USER, payload: res.data });
  };

  return (
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
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
              <Button variant="contained" color="success" type="submit">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
  // return (
  //   <>
  //     <Form
  //       onSubmit={onSubmit}
  //       render={({ handleSubmit, form, submitting, pristine, values }) => (
  //         <form onSubmit={handleSubmit}>
  //           <Grid container>
  //             <Grid item xs={12} sm={4}>
  //               <h4>Recipe Name</h4>
  //               <Field
  //                 name="recipeName"
  //                 component="input"
  //                 type="text"
  //                 placeholder="Name"
  //                 style={{ width: "100%" }}
  //               />
  //             </Grid>
  //             <Grid item xs={12} sm={8}>
  //               <h4>Difficulty</h4>
  //               <Field
  //                 render={
  //                   <Rating
  //                     name="difficulty"
  //                     value={difficulty}
  //                     onChange={(event, newValue) => setDifficulty(newValue)}
  //                   />
  //                 }
  //               />
  //             </Grid>

  //             <Grid item xs={12}>
  //               <h4>Ingredients</h4>
  //               <Field
  //                 name="ingredients"
  //                 component="textarea"
  //                 placeholder="Enter each ingredient on a new line"
  //                 style={{ width: "100%", minHeight: "10em" }}
  //               />
  //             </Grid>
  //             <Grid item xs={12}>
  //               <h4>Instructions</h4>
  //               <Field
  //                 name="instructions"
  //                 component="textarea"
  //                 placeholder="Enter each step on a new line"
  //                 style={{ width: "100%", minHeight: "10em" }}
  //               />
  //             </Grid>
  //           </Grid>
  //           <div className="buttons">
  //             <button type="submit" disabled={submitting || pristine}>
  //               Submit
  //             </button>
  //             <button
  //               type="button"
  //               onClick={form.reset}
  //               disabled={submitting || pristine}
  //             >
  //               Reset
  //             </button>
  //           </div>
  //           <span>{JSON.stringify(values, 0, 2)}</span>
  //         </form>
  //       )}
  //     />
  //   </>
  // );
}

export default RecipeCreateForm;
