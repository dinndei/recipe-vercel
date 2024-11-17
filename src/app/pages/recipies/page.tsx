'use client'

import { getRecipes } from '@/app/actions/recipeActions';
import Card from '@/app/components/card';
import Navbar from '@/app/components/Navbar';
import { useRecipeStore } from '@/app/store/recipeStore';
import { IRecipe } from '@/app/types/recipe';
import React, { useEffect, useState } from 'react';

const Page: React.FC = () => {
    const filteredRecipe = useRecipeStore((state) => state.filteredRecipe);
    const setFilteredRecipe = useRecipeStore((state) => state.setFilteredRecipe);
    const setRecipes = useRecipeStore((state) => state.setRecipes);

    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(8);

    const getRecipesInPage = async () => {
        try {
            const firstRecipes: IRecipe[]|null = await getRecipes();
            setFilteredRecipe(firstRecipes || []);
            setRecipes(firstRecipes || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getRecipesInPage();
    }, []);

    // חישוב המתכונים שמופיעים בעמוד הנוכחי
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipe.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(filteredRecipe.length / recipesPerPage);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // חישוב מספר העמודים
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredRecipe.length / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        
        <>
            <Navbar />
            <div>
                <div className="container mx-auto p-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {currentRecipes.map((recipe: IRecipe, index: number) => (
                            <Card key={index} recipe={recipe} />
                        ))}
                    </div>

                    <div className="flex justify-center items-center mt-6 space-x-2">
                        <button
                            className="text-gray-500 disabled:text-gray-300"
                            onClick={() => handleClick(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <React.Fragment key={number}>
                                {(number === 1 ||
                                    number === totalPages ||
                                    Math.abs(number - currentPage) <= 2) ? (
                                    <button
                                        onClick={() => handleClick(number)}
                                        className={`px-3 py-1 rounded-full ${currentPage === number
                                            ? 'bg-gray-300 text-black font-bold'
                                            : 'text-gray-500 hover:bg-gray-200'
                                            }`}
                                    >
                                        {number}
                                    </button>
                                ) : (
                                    number === currentPage + 3 || number === currentPage - 3 ? (
                                        <span key={number} className="px-2">...</span>
                                    ) : null
                                )}
                            </React.Fragment>
                        ))}

                        <button
                            className="text-gray-500 disabled:text-gray-300"
                            onClick={() => handleClick(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Page;
