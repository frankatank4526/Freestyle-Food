"use client"
import { useEffect, useState } from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Recipe } from "../RecipeMaker";
import * as client from "../client";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SavedRecipes() {
    const router = useRouter();
    const [recipes, setRecipes] = useState<any[]>([]);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const fetchUserRecipes = async () => {
        const savedRecipes = await client.findSavedRecipes(currentUser!._id as string);
        setRecipes(savedRecipes);
    }
    const deleteRecipe = async (recipeId: string) => {
        client.deleteRecipe(currentUser!._id, recipeId);
        setRecipes(() => recipes.filter((recipe) => recipe._id !== recipeId));
    }

    useEffect(() => {
        fetchUserRecipes();
    }, [currentUser])
    return (
        <Row className="justify-content-center">
            <Col xs={12} md={6}>
                <h2>Saved Recipes:</h2>
                <h4>Click on a recipe for a detailed view!</h4>
                <ListGroup>
                    {currentUser && recipes.map((recipe) => (
                        <ListGroupItem as={Link} className="m-1"
                            href={recipe.idMeal ? `/details/${encodeURIComponent(recipe.idMeal)}` : `/details/${encodeURIComponent(recipe._id)}`}>
                            <h3>Recipe Name: {recipe.strMeal}</h3>
                            <h3>Area/Origin: {recipe.strArea}</h3>
                            <FaTrash className="text-danger me-2 mb-1 float-end fs-2" onClick={(e) => {
                                e.preventDefault();
                                deleteRecipe(recipe._id);


                            }} />
                            <LuNotebookPen className="text-primary me-2 mb-1 float-end fs-2" onClick={(e) => {
                                e.preventDefault();
                                router.push(`/recipes/new?recipeId=${encodeURIComponent(recipe._id)}`)
                            }} />

                        </ListGroupItem>




                    ))}



                </ListGroup>
            </Col>

        </Row>


    );


}