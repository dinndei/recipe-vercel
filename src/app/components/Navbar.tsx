'use client'
import React, { useState } from 'react'
import { RecipeCategory } from '@/app/types/recipe';
import { useRecipeStore } from '../store/recipeStore';
import { filterByCategory, filterByLikes, filterByQuery } from '../clientFunctions/filters';

const Navbar: React.FC = () => {

    const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.All);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<string>('');

    const recipes = useRecipeStore((state) => state.recipes)
    const setFilteredRecipe = useRecipeStore((state) => state.setFilteredRecipe)


    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value as RecipeCategory
        setCategory(newCategory);
        console.log("category in navBar", category);
        console.log("newCategory in navBar", newCategory);

        const temp = filterByCategory(recipes, newCategory)
        setFilteredRecipe(temp)
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        //ביצוע כל הסינוים על המערך המקורי
        let filteredTmp= filterByCategory(recipes, category)
        if (activeTab == "likes")
             filteredTmp = filterByLikes(filteredTmp);
        const filteredByQuery = filterByQuery(filteredTmp, query)
        setFilteredRecipe(filteredByQuery)
    };

    const handleAddRecipe = () => {
        console.log('Adding recipe...');
        window.location.href = 'addRecipie'
    };

    const handleTabClick = (tab: string) => {
        if (tab === activeTab) {
            console.log("the same");
            return;
        }
        else {
            setActiveTab(tab);
            if (tab === "likes") {
                const temp = filterByLikes(recipes)
                setFilteredRecipe(temp)
            }
            else {
                console.log("all");
                setFilteredRecipe(recipes)
            }
        }
    };

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
                    {Object.values(RecipeCategory).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
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
