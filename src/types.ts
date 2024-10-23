interface Ingredient {
    id: number;
    name: string;
    image: string;
    aisle: string;
    original: string;
}   

export interface RecipeType {
    id: number;
    title: string;
    aggregateLikes: number;
    image: string;
    usedIngredients: Ingredient[];
    missedIngredients: Ingredient[];
    servings: number;
    readyInMinutes: number;
    healthScore: number;
    diets: string[];
}

export interface RecipeInformationType {
    instructions: string;
    title: string;
    ingredients: Ingredient[];
    analyzedInstructions: {
        steps: {
            step: string;
        }[];
    }[];
    image: string;
    extendedIngredients: Ingredient[];
    summary: string;
    servings: number;
    readyInMinutes: number;
    healthScore: number;
    diets: string[];
}