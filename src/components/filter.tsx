'use client'
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter, useSearchParams} from 'next/navigation';

interface FormData {
    ingredients: string;
    diet: string;
    mealType: string;
}

const Filter: React.FC = () => {
    
    const {register, handleSubmit, formState:{errors}, setValue} = useForm<FormData>();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const onSubmit:SubmitHandler<FormData> = (data:FormData) => {
        //check if ingredients are provided
        if (!data.ingredients) {
            return;
        }

        const query: { [key: string]: string } = {
            ingredients: data.ingredients
        };

        if (data.diet) {
            query.diet = data.diet;
        }

        if (data.mealType) {
            query.mealType = data.mealType;
        }
        //set the page to 1
        query.page = '0';
        //update the search params to the query and push to the url
        router.push(`/?${new URLSearchParams(query).toString()}`);
    };
    useEffect(()=>{
        //initialize the form with the search params
        if(searchParams?.has('ingredients')){
            setValue('ingredients',searchParams.get('ingredients')!)
        }
        if(searchParams?.has('diet')){
            setValue('diet',searchParams.get('diet')!)
        }
        if(searchParams?.has('mealType')){
            setValue('mealType',searchParams.get('mealType')!)
        }
    },[])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients</label>
                <input
                    type="text"
                    id="ingredients"
                    {...register("ingredients", { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2"
                    placeholder="Enter ingredients separated by commas"
                />
                {errors.ingredients && <p className="text-red-500 text-sm">Ingredients are required</p>}
            </div>
            <div>
                <label htmlFor="dietary" className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
                <input
                    type="text"
                    id="dietary"
                    {...register("diet")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2"
                    placeholder="E.g., vegetarian, gluten-free"
                />
            </div>
            <div>
                <label htmlFor="mealType" className="block text-sm font-medium text-gray-700">Meal Type</label>
                <select
                    id="mealType"
                    {...register("mealType")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2"
                >
                    <option value="">Select meal type</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                </select>
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
               Search Recipes
            </button>
        </form>
    );
}

export default Filter
