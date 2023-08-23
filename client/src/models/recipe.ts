import { Ingredient } from "./ingredient";
import { MongoObj } from "./mongoObject";

export type Recipe = MongoObj & {
    name: string,
    instructions: [string],
    ingredients: [Ingredient],
    rating: { default: 0, type: number },
    creator: string
}