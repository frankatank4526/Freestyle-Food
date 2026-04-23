"use client"
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import type { Recipe, Meals } from "../../recipes/RecipeMaker"
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import * as client from "../../recipes/client"
export default function RecipeDetails() {

    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const findRecipe = async () => {
        const response = await fetch(`/api/recipes/${recipeId}`);
        const data = await response.json() as Meals;
        if (data.meals === null) {
            const recipe = await client.findRecipeById(recipeId as string);
            setRecipe(recipe);
        } else {
            setRecipe(data.meals[0]);
        }
    };
    const displayAllIngredients = () => {
        // ChatGPT assisted "keyof" logic. Wasn't initially sure how to 
        // extract ingredients strIngredient1...strIngredient20. 
        // Then, ran into issue of needing to "loop over both" ingredients and measure, to which
        // the suggestion was to use pairs. 
        const pairs: { ingredient: string; measure: string }[] = [];

        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe?.[`strIngredient${i}` as keyof Recipe];
            const measure = recipe?.[`strMeasure${i}` as keyof Recipe];

            if (ingredient && ingredient.trim() !== "") {
                pairs.push({
                    ingredient,
                    measure: measure?.trim() || ""
                });
            }
        }

        return pairs;
    };

    useEffect(() => {

        findRecipe();
    }, []
    );
    return (
        <div>
            {recipe == null ? <h1>Recipe not found :&lt;</h1> :
                <div>
                    <h1 className="mb-3">{recipe.strMeal} </h1>
                   {recipe.strMealThumb !== "" && recipe.strMealThumb && <img src={`${recipe.strMealThumb}/large`} /> }
                    <Row className="m-4">
                        {
                            displayAllIngredients().map(({ ingredient, measure }, index) => (
                                <Col className="m-5" key={`ingredient-${index}`} xs={6} md={3} lg={2}>
                                    <h5>  {measure}, {ingredient} </h5>
                              { recipe.strMealThumb !== "" && recipe.strMealThumb && <img key={`ingredient-${ingredient}-${recipe.idMeal}`}
                                        src={`http://www.themealdb.com/images/ingredients/${ingredient.split(' ').join('_')}-small.png`} width="75%" height="auto" /> }

                                </Col>))

                        }
                    </Row>
                    <br />
                    <h2 className="ms-5"> Instructions: </h2>
                    <p className="m-5 text-start fw-normal fs-5"> {recipe.strInstructions} </p>
                    {recipe.strYoutube ? <Link className="fs-3 ms-5" href={recipe.strYoutube} > Youtube Link</Link> : ""}
                </div>
            }


        </div>

    );

}