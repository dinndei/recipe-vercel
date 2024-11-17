'use client'
import React, { useEffect, useState } from 'react'
import { RecipeCategory } from '@/app/types/recipe';
import { useRecipeStore } from '../store/recipeStore';

const Navbar: React.FC = () => {

    const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.All);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<string>('');

    const setFilters = useRecipeStore((state) => state.setFilters);
    
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value as RecipeCategory
        if (newCategory !== category) {
            setCategory(newCategory);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        if (query !== searchQuery) {
            setSearchQuery(query);
        }
    };

    const handleAddRecipe = () => {
        console.log('Adding recipe...');
        window.location.href = 'addRecipie'
    };

    const handleTabClick = (tab: string) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
        }
      };

      useEffect(() => {
        // When the filters change, apply the new filters.
        setFilters({
            category,
            query: searchQuery,
            onlyLiked: activeTab === 'likes',
        });
    }, [category, searchQuery, activeTab, setFilters]);


    return (

        <div>
            <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center border border-gray-300 rounded-full p-2 w-full">
                    <span className="pl-2 text-gray-500">
                        🔍
                    </span>
                    <input
                        id="search"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="חפש מתכון"
                        className="ml-2 flex-1 bg-transparent outline-none placeholder-gray-400 text-gray-700"
                    />
                </div>

                <div>
                    <button
                        onClick={handleAddRecipe}
                        className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
                    >
                        הוסף מתכון
                    </button>
                </div>
            </div>

            <div className="flex space-x-4 mt-4 items-center">
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="py-2 px-4 text-lg font-medium bg-gray-100 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
                >
                    <option value="">בחר קטגוריה</option>
                    {Object.values(RecipeCategory).map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <button
                    onClick={() => handleTabClick('categories')}
                    className={`py-2 px-4 text-lg font-medium rounded-full ${activeTab === 'categories' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                    כל הקטגוריות
                </button>
                <button
                    onClick={() => handleTabClick('likes')}
                    className={`py-2 px-4 text-lg font-medium rounded-full ${activeTab === 'likes' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                    מועדפים
                </button>

            </div>
        </div>


    )
}

export default Navbar
