import { create } from "zustand";
import { IRecipe } from "../types/recipe";

interface IRecipeStore {
    recipes: IRecipe[];
    filteredRecipe: IRecipe[];
    currentRecipe: IRecipe | null;
    setRecipes: (recipes: IRecipe[]) => void;
    setFilteredRecipe: (recipes: IRecipe[]) => void;
    addRecipe: (newRecipe: IRecipe) => void;
    deleteRecipe: (id: string) => void;
    updateLike: (id: string,isLiked:boolean) => void;
}

export const useRecipeStore = create<IRecipeStore>((set) => ({
    recipes: [],//get
    currentRecipe: null,
    filteredRecipe: [],
    setRecipes: (myrecipes: IRecipe[]) => {
        set({ recipes: myrecipes })
    },
    setFilteredRecipe: (myrecipes: IRecipe[]) => {
        set({ filteredRecipe: myrecipes })
    },
    addRecipe: (newRecipe: IRecipe) =>
        set((state) => ({
            recipes: [...state.recipes, newRecipe] // מחזירים את המערך המעודכן
        })),
    deleteRecipe: (id: string) =>
        set((state) => ({
            recipes: state.recipes.filter(item => item._id != id), // מחזירים את המערך לאחר הסינון
            filteredRecipe:state.filteredRecipe.filter(item => item._id != id)
        })),
        updateLike: (id: string, isLiked: boolean) =>
            set((state) => ({
                filteredRecipe: state.filteredRecipe.map((item) =>
                    item._id === id ? { ...item, like: isLiked } : item
                ) as IRecipe[], 
                recipes: state.recipes.map((item) =>
                    item._id === id ? { ...item, like: isLiked } : item
                ) as IRecipe[], 
            }))

}))