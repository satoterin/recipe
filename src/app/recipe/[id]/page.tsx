'use client'
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

import { RecipeInformationType } from '@/types';
import AIDescription from '@/components/ai-response';



const RecipePage: React.FC = () => {
  const params = useParams()
  const router = useRouter()
  const [recipeInfo, setRecipeInfo] = useState<RecipeInformationType | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    async function getRecipeInformation(id: string):Promise<void> {
      setIsLoading(true) 
      const response = await axios.get(`/api/recipes/${id}`);
      const recipeInfo =  response.data;
      setRecipeInfo(recipeInfo);
      setIsLoading(false)
    }
    getRecipeInformation(params?.id as string);
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <button onClick={() => router.back()} className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Return to List
        </button>
      </div>
      {isLoading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : recipeInfo ? (
        <div>
          <h1 className="text-3xl font-bold mb-6">{recipeInfo.title}</h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <img src={recipeInfo.image} alt={recipeInfo.title} className="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ul className="list-disc list-inside">
                {recipeInfo.extendedIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.original}</li>
                ))}
              </ul>
              <h2 className="text-2xl font-semibold mt-4">Additional Information</h2>
              <p className="mb-2"><strong>Servings:</strong> {recipeInfo.servings}</p>
              <p className="mb-2"><strong>Ready in:</strong> {recipeInfo.readyInMinutes} minutes</p>
              <p className="mb-2"><strong>Health Score:</strong> {recipeInfo.healthScore}</p>
              <p className="mb-4"><strong>Diets:</strong> {recipeInfo.diets.join(', ')}</p>
            </div>

          </div>
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <ol className="list-decimal list-inside space-y-2">
                {recipeInfo.analyzedInstructions[0]?.steps.map((step, index) => (
                  <li key={index}>{step.step}</li>
                ))}
              </ol>
            </div>
            <div>
              <div dangerouslySetInnerHTML={{ __html: recipeInfo.summary }} className="prose max-w-none" />
            </div>
          </div>
          <div className="mt-8">
            <AIDescription recipeInfo={recipeInfo} />
          </div>
        </div>
      ) : (
        <p className="text-center text-xl">Recipe not found</p>
      )}
    </div>
  );
};

export default RecipePage;

