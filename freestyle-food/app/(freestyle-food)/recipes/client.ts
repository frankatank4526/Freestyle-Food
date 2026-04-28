import axios from "axios";




const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true});
const RECIPES_API = `${HTTP_SERVER}/api/recipes`
export const findAllRecipes = async (userId: string) => {
    const { data } = await axios.get(`${RECIPES_API}/${userId}`);
    return data;
}

export const createRecipe = async (userId: string, recipe: any) => {
    const { data } = await axiosWithCredentials.post(`${RECIPES_API}/new/${userId}`, recipe);
    return data;
}

export const findRecipeById = async (recipeId: string) => {
    const { data } = await axios.get(`${RECIPES_API}/user/${recipeId}`);
    return data; 
}

export const findSavedRecipes = async (userId: string) => {
    const { data } = await axios.get(`${RECIPES_API}/${userId}`);
    return data; 
}

export const deleteRecipe = async (userId: string, recipeId: string) => {
    const { data } = await axios.delete(`${RECIPES_API}/${userId}/${recipeId}`)
    return data;
}

export const updateRecipe = async (userId: string, recipeId: string, recipeUpdates: any) => {
    const { data } = await axios.put(`${RECIPES_API}/${userId}/${recipeId}`, recipeUpdates);
    return data; 
}
