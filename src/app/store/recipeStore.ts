import { create } from "zustand";
import { IRecipe, RecipeCategory } from "../types/recipe";
import { filterRecipes } from "../clientFunctions/filters";

interface IRecipeStore {
    recipes: IRecipe[];
    filteredRecipe: IRecipe[];
    currentRecipe: IRecipe | null;
    filters: {
        category: RecipeCategory;
        query: string;
        onlyLiked: boolean;
    };
    setFilters: (filters: Partial<IRecipeStore["filters"]>) => void;
    applyFilters: () => void;
    setRecipes: (recipes: IRecipe[]) => void;
    setFilteredRecipe: (recipes: IRecipe[]) => void;
    addRecipe: (newRecipe: Partial<IRecipe>) => void;
    deleteRecipe: (id: string) => void;
    updateLike: (id: string, isLiked: boolean) => void;
}

export const useRecipeStore = create<IRecipeStore>((set, get) => ({
    recipes: [],
    currentRecipe: null,
    filteredRecipe: [],
    filters: {
        category: RecipeCategory.All,
        query: "",
        onlyLiked: false,
    },
    setFilters: (newFilters) => {
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        }));
        get().applyFilters(); // Automatically reapply filters
    },
    applyFilters: () => {
        const { recipes, filters } = get();
        const filtered = filterRecipes({
            items: recipes,
            category: filters.category,
            query: filters.query,
            onlyLiked: filters.onlyLiked,
        });
        set({ filteredRecipe: filtered });
    },
    setRecipes: (myrecipes: IRecipe[]) => {
        set({ recipes: myrecipes })
    },
    setFilteredRecipe: (myrecipes: IRecipe[]) => {
        set({ filteredRecipe: myrecipes })
    },
    addRecipe: (newRecipe: Partial<IRecipe>) =>
        set((state) => {
            console.log('New Recipe - store:', newRecipe); // הדפסה של המתכון החדש
            const updatedRecipes = [...state.recipes, newRecipe] as IRecipe[];
            console.log('Updated Recipes:', updatedRecipes); // הדפסה של המערך המעודכן
            return {
                recipes: updatedRecipes, // מחזירים את המערך המעודכן
            };

        }),
    deleteRecipe: (id: string) =>
        set((state) => ({
            recipes: state.recipes.filter(item => item._id != id), // מחזירים את המערך לאחר הסינון
            filteredRecipe: state.filteredRecipe.filter(item => item._id != id)
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