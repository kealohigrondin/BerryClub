import { Ingredient, emptyIngredient } from "./ingredient";
import { MongoObj } from "./mongoObject";

export type Recipe = MongoObj & {
    name: string,
    instructions: string,
    ingredients: [Ingredient],
    rating: number,
    creator: string
}

export const emptyRecipe: Recipe = {
    _id: '',
    name: '',
    instructions: '',
    ingredients: [emptyIngredient],
    rating: 0,
    creator: ''
}