'use client'
import React, { useEffect, useState } from 'react'
import { IRecipe } from '../types/recipe';
import Image from 'next/image';
import { updateRecipeLike } from '../actions/recipeActions';
import Modal from './Modal';
import { useRecipeStore } from '../store/recipeStore';
import { deleteRecipeById } from '../actions/recipeActions';

type RecipeCardData = Pick<IRecipe, '_id' | 'name' | 'category' | 'image' | 'instructions' | 'ingredients' | 'like'>;

interface RecipeCardProps {
    recipe: RecipeCardData;
    onLikeToggle?: (liked: boolean) => void;
}

const Card: React.FC<RecipeCardProps> = ({ recipe }) => {
    const [isLiked, setIsLiked] = useState(recipe.like);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLiked(recipe.like);
    }, [recipe.like]);

    const handleLikeToggle = () => {
        const newLikeStatus = !isLiked;
        setIsLiked(newLikeStatus);
        updateRecipeLike(String(recipe._id), newLikeStatus);
    };

    const deleteRecipe = useRecipeStore((state) => state.deleteRecipe)
    const filteredRecipe = useRecipeStore((state) => state.filteredRecipe)


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deleterecipe = async () => {
        const result = await deleteRecipeById(String(recipe._id))
        console.log(result);
        if (result) {            
            deleteRecipe(String(recipe._id))            
            closeModal()
        }
    }

    return (
        <div>
            <div className="border rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={openModal}>
                <Image
                    src={recipe.image}
                    alt={recipe.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{recipe.name}</h3>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // כדי למנוע פתיחת המודאל בלחיצה על הלב
                                handleLikeToggle();
                            }}
                            className={`cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                            style={{ fontSize: '24px' }}
                        >
                            {isLiked ? '❤️' : '🤍'}
                        </button>
                    </div>

                    <p className="text-gray-500">{recipe.category}</p>
                    {/* <ul className="mt-2">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-sm text-gray-700">- {ingredient}</li>
                        ))}
                    </ul> */}
                </div>
            </div>
            {isModalOpen && <Modal recipe={recipe} onClose={closeModal} onDelete={deleterecipe} />}
        </div>


    )
}

export default Card
