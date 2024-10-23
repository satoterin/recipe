import { useState, useEffect } from 'react';
import axios from 'axios';
import { RecipeInformationType } from '@/types';

const AIDescription: React.FC<{ recipeInfo: RecipeInformationType | null }> = ({ recipeInfo }) => {
    const [aiDescription, setAiDescription] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchAIDescription = async () => {
        if (!recipeInfo) return;
  
        setIsLoading(true);
        setError(null);
  
        try {
          const response = await axios.post('/api/ai', {
            title: recipeInfo.title,
            ingredients: recipeInfo.extendedIngredients.map(ingredient => ingredient.original),
            instructions: recipeInfo.analyzedInstructions[0]?.steps.map(step => step.step)
          });
          setAiDescription(response.data.description);
        } catch (err) {
          setError('Failed to load AI description. Please try again later.');
          console.error('Error fetching AI description:', err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchAIDescription();
    }, [recipeInfo]);
  
    if (isLoading) {
      return <p className="text-center text-xl">Loading AI description...</p>;
    }
  
    if (error) {
      return <p className="text-center text-xl text-red-500">{error}</p>;
    }
  
    if (!aiDescription) {
      return null;
    }
  
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">AI-Generated Description</h2>
        <p className="text-lg">{aiDescription}</p>
      </div>
    );
  };
  export default AIDescription;