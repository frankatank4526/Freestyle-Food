"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { recipeCard } from "../recipes/RecipeMaker";
import type { Meals, Recipe } from "../recipes/RecipeMaker";
import { useEffect, useState } from "react";
import router from "next/router";
import { Row, Col, Button } from "react-bootstrap";
export default function ResultsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ingredient1 = searchParams.get("ingredient1") || "";
    const ingredient2 = searchParams.get("ingredient2") || "";
    const ingredient3 = searchParams.get("ingredient3") || "";
    const ingredient4 = searchParams.get("ingredient4") || "";
    const [meals, setMeals] = useState<Recipe[]>([]);
    const fetchResults = async () => {
        const response = await 
        fetch(`/api/recipes?ingredient1=${encodeURIComponent(ingredient1)}&ingredient2=${encodeURIComponent(ingredient2)}&ingredient3=${encodeURIComponent(ingredient3)}&ingredient4=${encodeURIComponent(ingredient4)}`)
        const data = await response.json() as Meals;
        setMeals(data.meals);
    }

    useEffect(() => {
        fetchResults();
    }, []);

    return (
        <div>
        <Button variant="info" onClick={() => router.push("/search")} className="mb-3 mx-2" style={{width:"200px"}}>Back to Search</Button>
       { meals ? 
        <Row className="m-3">
                {meals.map((meal: Recipe) => (
                    <Col key={`col-${meal.idMeal}`} xs={12} md={3}>
                        {recipeCard(meal, router)}
                    </Col>

                ))}
            </Row>   :
            <h2>No matching recipes found :&lt;</h2>}

            </div>

    );



}