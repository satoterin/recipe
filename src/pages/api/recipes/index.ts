// pages/api/fetchRecipes.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
type ExtraParams = {
  diet?: string;
  type?: string;
}
export async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const { ingredients, diet, mealType, page } = req.query;

  
  const apiKey = process.env.SPOONACULAR_API_KEY;
  const apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  const options:ExtraParams = {
    
  }
  if(diet) options.diet = diet as string;
  if(mealType) options.type = mealType as string;
 
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'x-api-key': apiKey,
      },
      params: {
        includeIngredients: ingredients as string,
        addRecipeInformation: true, //add recipe information like instructions, ingredients, etc
        sort: 'max-used-ingredients', //sort by the number of ingredients used
        fillIngredients: true, //fill the ingredients with information
        offset: (parseInt(page as string) - 1) * 10, //offset the results to get the next page
        ...options,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
}



// The default export function will act as the entry point for the API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await handleGet(req, res);  // Call the GET handler
  } else {
    // Handle other HTTP methods or return an error for unsupported methods
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}