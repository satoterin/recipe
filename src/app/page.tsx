'use client'
import React, { useState, useEffect } from 'react';
import Pagination from '@/components/pagination';

import Filter from '@/components/filter';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { RecipeType } from '@/types';
import Recipe from '@/components/recipe';



const Home: React.FC = () => {
    const [recipes, setRecipes] = useState<RecipeType[] | null>(); //
    const [pageCount, setPageCount] = useState(0); //recipes page count

    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false) //loading state
    
    useEffect(()=>{
        // fetch recipes from api
        const fetchRecipes = async () => {
            // set loading to true
            setIsLoading(true)
            try {
                const res = await axios.get('/api/recipes',{params:searchParams})
                if(res.status === 200){
                setRecipes(res.data.results)
                setPageCount(Math.ceil(res.data.totalResults / 10))
            }
            } catch (error) {
                toast.error('Failed to fetch recipes. Please try again later.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setRecipes(null)
            }
            
            setIsLoading(false)
        };
        // fetch recipes only if ingredients are present
        if(searchParams?.has('ingredients')){
            fetchRecipes()
        }
    },[searchParams])
    
    return (

        <div className="md:flex h-full">
            <div className="sm:w-full md:w-96 bg-white p-4 mr-4">
                <Filter />
            </div>
            <div className="md:flex-grow sm:w-full bg-white p-4 overflow-y-auto">
                {!searchParams ? (
                    <p className="text-center text-gray-600">No search parameters provided</p>
                ) : !searchParams.has('ingredients') ? (
                    <p className="text-center text-gray-600">No ingredients provided</p>
                ) : isLoading ? (
                    <p className="text-center text-gray-600">Loading...</p>
                ) : recipes && recipes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            {recipes.map((recipe: RecipeType) => (
                                <Recipe recipe={recipe} key={recipe.id} />
                            ))}
                        </div>
                        <Pagination pageCount={pageCount} />
                    </>
                ) : recipes === null ? (
                    <p className="text-center text-gray-600">There was an error fetching recipes. Please try again later.</p>
                ) : (
                    <p className="text-center text-gray-600">No recipes found. Try a different search.</p>
                )}
                
            </div>
        </div>
    );
}

export default Home
