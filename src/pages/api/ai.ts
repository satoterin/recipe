import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { title, ingredients, instructions } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: 'Product name is required' });
  }
  
  const prompt = `Generate a creative and engaging description for this recipe:\n\nTitle: ${title}\n\nIngredients: ${ingredients.join(', ')}\n\nInstructions: ${instructions}`;
  try {
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates product descriptions."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedDescription = openaiResponse.data.choices[0].message.content;

    res.status(200).json({ description: generatedDescription });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message)
      res.status(error.status || 500).json({ error: error.message || 'Error generating product description' });
    } else {
      res.status(500).json({ message: 'Error generating product description' });
    }
   
  }
}
