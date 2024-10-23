'use client'
import React from 'react';
import { RecipeType } from '@/types';
import Link from 'next/link';
export default function Recipe({recipe}:{recipe:RecipeType}){
    return (
        <div key={recipe.id} className="border rounded-lg p-4 shadow-sm">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-md mb-2" />
            <h2 className="text-lg font-semibold mb-1">{recipe.title}</h2>
            <p className="text-sm text-gray-600">Likes: {recipe.aggregateLikes}</p>
            <div className="mt-2">
                <h3 className="text-md font-semibold mb-1">Used Ingredients:</h3>
                <ul className="list-disc list-inside text-sm">
                    {recipe.usedIngredients.map(ingredient => ingredient.name).join(', ')}
                </ul>
            </div>
            <div className="mt-2">
                <h3 className="text-md font-semibold mb-1">Missed Ingredients:</h3>
                <ul className="list-disc list-inside text-sm">
                    {recipe.missedIngredients.map(ingredient => ingredient.name).join(', ')}
                </ul>
            </div>
            <Link href={`/recipe/${recipe.id}`}>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">View Recipe</button>
            </Link>
        </div>
    )
}
