"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, FormControl, FormLabel, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import * as client from "../client"
import { RootState } from "../../store";
import { useSelector } from "react-redux";


export default function NewRecipe() {

    // Logic of using a useState variable + map functions to simplify taking in 20 ingredients
    // and measurements was suggested by ChatGPT
    const [ingredients, setIngredients] = useState<string[]>(Array(20).fill(""));
    const [measurements, setMeasurements] = useState<string[]>(Array(20).fill(""));
    const [name, setName] = useState<string>("");
    // If time allows, areas can be turned into a dropdown with API call to all area options
    const [area, setArea] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [youtube, setYoutube] = useState<string>("");
    const searchParams = useSearchParams();
    const recipeId = searchParams.get("recipeId") || "";
    const [recipe, setRecipe] = useState<any>(null);

    const fetchRecipe = async () => {
        if (recipeId) {
            const editRecipe = await client.findRecipeById(recipeId);
            setRecipe(editRecipe);
        }
    }
    const router = useRouter();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    useEffect(() => {
        fetchRecipe();
    }, [])
    return (
        <Row className="justify-content-center">

            <Col xs={12} md={6} >
                <h2> {recipe? "Edit Recipe:" : "Create Recipe" }</h2>
                <ListGroup>

                    <ListGroupItem>
                        <FormLabel htmlFor="recipe-name" className="fs-3">Recipe Name:</FormLabel>
                        <FormControl id="recipe-name" placeholder="Recipe Name"
                            onChange={(e) => setName(e.target.value)} />
                    </ListGroupItem>
                    <ListGroupItem>
                        <FormLabel htmlFor="recipe-area" className="fs-3">Area of Origin: </FormLabel>
                        <FormControl id="recipe-origin" placeholder="Japan"
                            onChange={(e) => setArea(e.target.value)} />
                    </ListGroupItem>
                    <ListGroupItem>
                        <FormLabel htmlFor="recipe-instructions" className="fs-3">Instructions:</FormLabel>
                        <FormControl id="recipe-instructions" as="textarea" rows={8}
                            onChange={(e) => setInstructions(e.target.value)} />
                    </ListGroupItem>
                    <ListGroupItem>
                        <FormLabel htmlFor="recipe-youtube" className="fs-3">Youtube Link:</FormLabel>
                        <FormControl id="recipe-youtube" placeholder="www.youtube.com/..."
                            onChange={(e) => setYoutube(e.target.value)} />
                    </ListGroupItem>
                    {ingredients.map((ingredient, index) => (
                        <ListGroupItem>
                            <FormLabel htmlFor={`recipe-ingredient${index}`} key={`recipe-ingredient-${index}`}
                                className="fs-3">Ingredient {index + 1}:</FormLabel>
                            <FormControl id={`recipe-ingredient${index}`} placeholder={`Ingredient ${index}`}
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index] = e.target.value;
                                    setIngredients(newIngredients);
                                }} />
                        </ListGroupItem>

                    ))}
                    {measurements.map((measurement, index) => (
                        <ListGroupItem>
                            <FormLabel htmlFor={`recipe-measurement${index}`} key={`recipe-measurement-${index}`}
                                className="fs-3">Measurement {index + 1}:</FormLabel>
                            <FormControl id={`recipe-measurement${index}`} placeholder={`Measurement ${index}`}
                                onChange={(e) => {
                                    const newMeasurements = [...measurements];
                                    newMeasurements[index] = e.target.value;
                                    setMeasurements(newMeasurements);
                                }} />
                        </ListGroupItem>

                    ))}
                </ListGroup>
                <Button variant="primary" className="m-2" onClick={async () => {
                    let newRecipe = {
                        ...Object.fromEntries(ingredients.map((v, i) => [`strIngredient${i + 1}`, v])),
                        ...Object.fromEntries(measurements.map((v, i) => [`strMeasure${i + 1}`, v])),
                        strMeal: name,
                        strArea: area,
                        strInstructions: instructions,
                        strYoutube: youtube,
                        strMealThumb: "",
                    }
                    if (recipe) {
                        await client.updateRecipe(currentUser!._id, recipe._id, newRecipe);
                    }
                    else {
                        await client.createRecipe(currentUser!._id, newRecipe);
                    }
                    router.push("/recipes");
                }}>{recipe? "Save Edits" : "Create New Recipe!"}</Button>
                <Button variant="danger" className="m-2" onClick={() => router.push("/recipes")}>Cancel</Button>
            </Col>
        </Row>

    );

}