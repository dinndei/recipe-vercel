'use client';
import React from 'react';
import Image from 'next/image';
import { IRecipe } from '../types/recipe';

interface ModalProps {
  recipe: Pick<IRecipe, '_id' | 'name' | 'category' | 'image' | 'instructions' | 'ingredients'>;
  onClose: () => void;
  onDelete: () => void
}

const Modal: React.FC<ModalProps> = ({ recipe, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 p-2 rounded-full hover:bg-red-600"
        >
          X
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            <Image
              src={recipe.image}
              alt={recipe.name}
              width={500}
              height={300}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h2 className="text-2xl font-semibold">{recipe.name}</h2>
            <p className="text-lg text-gray-600 mt-2">{recipe.category}</p>
            <p className="mt-4">{recipe.instructions}</p>
            <ul className="mt-4 list-disc pl-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="text-sm text-gray-700">{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onDelete}  // Trigger the delete function passed from parent
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            מחק מתכון
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;