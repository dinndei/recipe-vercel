import axios from "axios";
import { IRecipe } from "../types/recipe";


// GET all recipes
export const getRecipes = async (): Promise<IRecipe[] | null> => {
    try {
        const res = await axios.get('/api/get', {
            headers: { 'Cache-control': 'no-cache' }
        });
        console.log("res", res);

        if (res.status == 404)
            return null;
        if (res.status == 500)
          throw new Error("server error in get recipies");
        return res.data.recipes;
        

    } catch (error) {
        console.error(error);
        return [];
    }
};

// GET recipe by ID
export const getRecipeById = async (id: string): Promise<IRecipe | null> => {
    try {
        const res = await axios.get(`/api/${id}`, {
            headers: { 'Cache-control': 'no-cache' }
        });
        return res.data.recipe;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// POST user to get token
export const loginToken = async (user: { email: string, password: string }): Promise<string | null> => {
    try {
        const res = await axios.post(`/api/login`,
            { user },
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        console.log("res.data.token", res.data.token);

        return res.data.token;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// DELETE recipe by ID
export const deleteRecipeById = async (id: string): Promise<IRecipe | null> => {
    try {
        const res = await axios.delete(`/api/delete/${id}`, {
            headers: { 'Cache-control': 'no-cache' }
        });
        return res.data.recipe;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// // UPDATE recipe by ID
// export const updateRecipeById = async (id: string, newRecipe: Partial<IRecipe>): Promise<IRecipe | null> => {
//     try {
//         let res = await axios.put<{ recipe: IRecipe }>(`http://localhost:3000/api/recipe/put/${id}`, newRecipe, {
//             headers: { 'Cache-control': 'no-cache' }
//         });
//         return res.data.recipe;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// };

// CREATE a new recipe
export const createRecipe = async (recipe: Partial<IRecipe>): Promise<IRecipe | null> => {
    try {
        const res = await axios.post('/api/post',
            recipe,
            {
                headers: { 'Cache-control': 'no-cache' }
            });
        console.log("in create recipe action", recipe);
        console.log("res.data.recipe", res.data.recipe);
        console.log("res", res);
        if (res.data.status === 500) {
            console.error("Server error creating recipe:", res.data.message);
            return null;
        }
        return res.data.recipe;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// UPDATE recipe 'like' status by ID
export const updateRecipeLike = async (id: string, like: boolean): Promise<IRecipe | null> => {
    try {
        const res = await axios.put(`/api/putLike/${id}`, { like }, {
            headers: { 'Cache-control': 'no-cache' }
        });

        console.log("Updated recipe like status:", res.data.recipe);

        return res.data.recipe;
    } catch (error) {
        console.error("Error updating recipe like status:", error);
        return null;
    }
};
