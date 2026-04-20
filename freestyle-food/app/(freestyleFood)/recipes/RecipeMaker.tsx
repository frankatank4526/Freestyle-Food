"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";



export type CategoryValue = {
    idCategory: string,
    strCategory: string,
    strCategoryThumb: string,
    strCategoryDescription: string,
}
export type Category = {
    categories: CategoryValue[];

};
export type Recipe = {
    idMeal: string,
    strMeal: string, // Name of recipe
    strArea: string,
    strInstructions: string,
    strMealThumb: string,
    strYoutube: string,
    strIngredient1: string,
    strIngredient2: string,
    strIngredient3: string,
    strIngredient4: string,
    strIngredient5: string,
    strIngredient6: string,
    strIngredient7: string,
    strIngredient8: string,
    strIngredient9: string,
    strIngredient10: string,
    strIngredient11: string,
    strIngredient12: string,
    strIngredient13: string,
    strIngredient14: string,
    strIngredient15: string,
    strIngredient16: string,
    strIngredient17: string,
    strIngredient18: string,
    strIngredient19: string,
    strIngredient20: string,

    strMeasure1: string,
    strMeasure2: string,
    strMeasure3: string,
    strMeasure4: string,
    strMeasure5: string,
    strMeasure6: string,
    strMeasure7: string,
    strMeasure8: string,
    strMeasure9: string,
    strMeasure10: string,
    strMeasure11: string,
    strMeasure12: string,
    strMeasure13: string,
    strMeasure14: string,
    strMeasure15: string,
    strMeasure16: string,
    strMeasure17: string,
    strMeasure18: string,
    strMeasure19: string,
    strMeasure20: string,

}
export type Meals = {
    meals: Recipe[];
}
export default function RecipeMaker({showCategories, setShowCategories}: {showCategories: boolean, setShowCategories: (show: boolean) => void}) {
    const [categories, setCategories] = useState([] as any[]);
    const router = useRouter();
    const [currentCategory, setCurrentCategory] = useState("");
    const [meals, setMeals] = useState([] as any);
    const [pageIndex, setIndex] = useState(0);
    const [mealPages, setMealPages] = useState([] as any);
    const findCategories = async () => {
        const response = await fetch("/api/categories");
        const data = await response.json() as Category;
        console.log(data);
        setCategories(data.categories);
    };

    const findRecipesInCategory = async (categoryName: string) => {
        const response = await fetch(`/api/categories/${encodeURIComponent(categoryName)}`);
        const data = await response.json() as Meals;
        console.log("HERE HERE HERE");
        console.log(data.meals);
        setMeals(data.meals);
        organizeMeals(data.meals);

    };

    const organizeMeals = (allMeals: Recipe[]) => {
        /* let mealArray = [];
        
        for (let i = 0; i < meals.length; i++) {
            mealArray.push(meals[i]);
            if (i + 1 > 24 && (i + 1) % 25 === 0) {
                setMealPages([...mealPages, mealArray]);
                mealArray = [];
            }
        }
            */
        // Above is my original implementation of organizing the recipes into pages, each containing 25 items.
        // There were state related bugs and I used a ChatGPT suggested implementation below:
        const mealPages = [];
        for (let i = 0; i < allMeals.length; i += 25) {
            if (i + 25 >= allMeals.length) {
                mealPages.push(allMeals.slice(i, allMeals.length - 1));
                break;
            }
            mealPages.push(allMeals.slice(i, i + 25));
        }
        setMealPages(mealPages);

    }
    const recipeCard = (recipe: Recipe) => {
        return (
            <Card className="m-2" key={`card-${recipe.idMeal}`}>
                <CardImg width="50%" height="auto" key={`cardImg-${recipe.idMeal}`} variant="top" src={`${recipe.strMealThumb}/medium`} />
                <CardBody>
                    <CardTitle key={`cardTitle-${recipe.idMeal}`}>{recipe.strMeal} </CardTitle>
                    <Button variant="info" onClick={() => router.push(`/recipes/${recipe.idMeal}`)} >
                        More Info
                    </Button>
                </CardBody>

            </Card>

        );
    };

    useEffect(() => {
        findCategories();
    }, []);
    return (
        <div>
            {showCategories && categories.map((category: CategoryValue) => (

                <Button className="category-button p-3" id={category.idCategory} key={category.idCategory}
                    onClick={() => {
                        setCurrentCategory(category.strCategory);
                        setShowCategories(false);
                        findRecipesInCategory(category.strCategory);
                    }}>
                    <img key={`button-${category.idCategory}`} src={category.strCategoryThumb} width="120px" height="auto" />
                    <span key={`span-${category.idCategory}`} className="category-name mt-2 font-semibold text-warning"> {category.strCategory} </span>
                </Button>

            ))}
            <Row className="m-3">
                {!showCategories && mealPages[pageIndex]?.map((meal: Recipe) => (
                <Col key={`col-${meal.idMeal}`} xs={12} md={3}>
                    {recipeCard(meal)}
                </Col>

            ))}
            </Row>

        </div>




    );

}