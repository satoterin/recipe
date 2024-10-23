import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { RecipeInformationType } from '@/types';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid recipe ID' });
  }
  
  try {
    const response = await axios.get<RecipeInformationType>(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );
 
    res.status(200).json(response.data,);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching recipe information' });
  }
}
