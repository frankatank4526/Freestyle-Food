"use client"
import { useEffect, useState } from "react";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Recipe } from "../RecipeMaker";
import * as client from "../client";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function SavedRecipes() {

    const [recipes, setRecipes] = useState<any[]>([]);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const fetchUserRecipes = async () => {
        const savedRecipes = await client.findSavedRecipes(currentUser!._id as string);
        setRecipes(savedRecipes);
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
                        href={recipe.idMeal? `/details/${recipe.idMeal}`: `/details/${recipe._id}`}>
                            <h3>Recipe Name: {recipe.strMeal}</h3>
                            <h3>Area/Origin: {recipe.strArea}</h3>


                        </ListGroupItem>



                    ))}



                </ListGroup>
            </Col>

        </Row>
        

    );


}