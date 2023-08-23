import { MongoObj } from "./mongoObject";

export type Ingredient = MongoObj & {
    name: string;
    quantity: number;
    unit: string;
}