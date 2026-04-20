import axios from "axios";



const FOOD_API = "http://www.themealdb.com/api/json/v2/65232507"

/* DEPRECATED. VIOLATES CORS. 
export const findAllCategories = async () => {
    const response = await axios.get(`${FOOD_API}/categories.php`);
    return response.data;
}

export const findAllAreas = async () => {
    const response = await axios.get(`${FOOD_API}/list.php?a=list`);
    return response.data;
}

export const findAllIngredients = async () => {
    const response = await axios.get(`${FOOD_API}/list.php?c=list`);
    console.log(response.data);
    return response.data;
}

export const findRecipeById = async (recipeId: string) => {
    const response = await axios.get(`${FOOD_API}/lookup.php?i=${recipeId}`)
    console.log(response.data);
    return response.data;
}
    */

