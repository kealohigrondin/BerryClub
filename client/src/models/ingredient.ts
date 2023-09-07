import { MongoObj } from "./mongoObject";

export type Ingredient = MongoObj & {
    name: string;
    quantity: number;
    unit: string;
}

export const emptyIngredient: Ingredient = {
    _id: '',
    name: '',
    quantity: 0,
    unit: ''
}