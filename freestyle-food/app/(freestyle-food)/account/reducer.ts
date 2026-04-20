import { createSlice } from "@reduxjs/toolkit";
import type { Recipe } from "../recipes/RecipeMaker";
type User = {
    _id: string;
    username: string;
    password: string;
    email: string;
    role: string;
    favoriteId: string;
    recipesCreated: number;
    savedRecipes: Recipe[];
    
};

const initialState = {
    currentUser: null as User | null
};

const accountSlice = createSlice( {
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    
    },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;