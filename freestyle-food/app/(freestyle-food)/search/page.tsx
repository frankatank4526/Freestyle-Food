"use client"
import { useRouter } from "next/navigation";
import { recipeCard } from "../recipes/RecipeMaker";
import { Button, Col, FormControl, FormLabel, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useState } from "react";

export default function SearchPage() {

    const router = useRouter();
    const [ingredient1, setIngredient1] = useState("");
    const [ingredient2, setIngredient2] = useState("");
    const [ingredient3, setIngredient3] = useState("");
    const [ingredient4, setIngredient4] = useState("");
    return (
        <Row>

            <Col xs={12} md={6}>
                <ListGroup>
                    <ListGroupItem>
                        <FormLabel htmlFor="search-label-1" className="fs-2 m-2">Ingredient 1</FormLabel>
                        <FormControl id="search-control-1" className="m-2" placeholder="Chicken breast" onChange={(e) => setIngredient1(e.target.value)} />
                    </ListGroupItem>

                    <ListGroupItem>
                        <FormLabel htmlFor="search-label-2" className="fs-2 m-2">Ingredient 2</FormLabel>
                        <FormControl id="search-control-2" className="m-2" placeholder="Soy Sauce" onChange={(e) => setIngredient2(e.target.value)} />
                    </ListGroupItem>

                    <ListGroupItem>
                        <FormLabel htmlFor="search-label-4" className="fs-2 m-2">Ingredient 3</FormLabel>
                        <FormControl id="search-control-4" className="m-2" placeholder="Rice" onChange={(e) => setIngredient3(e.target.value)} />
                    </ListGroupItem>

                    <ListGroupItem>
                        <FormLabel htmlFor="search-label-4" className="fs-2 m-2">Ingredient 4</FormLabel>
                        <FormControl id="search-control-4" className="m-2" placeholder="Salt" onChange={(e) => setIngredient4(e.target.value)} />
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button variant="primary" className="m-3" style={{ width: "150px" }} onClick={() => {
                            /* const param1 = ingredient1.split(" ").join("_");
                             const param2 = ingredient2.split(" ").join("_");
                             const param3 = ingredient3.split(" ").join("_");
                             const param4 = ingredient4.split(" ").join("_");
                             router.push(`/results?ingredient1=${encodeURIComponent(param1)}&ingredient2=${encodeURIComponent(param2)}&ingredient3=${encodeURIComponent(param3)}&ingredient4=${encodeURIComponent(param4)}`)
                             */
                            // Could add another conditional and brute force the above, but am using ChatGPT suggested alternative below.
                            // Suggestion makes sense as URLSearchParams class is essentially meant for this. 

                            const params = new URLSearchParams();

                            if (ingredient1) params.append("ingredient1", ingredient1.split(" ").join("_"));
                            if (ingredient2) params.append("ingredient2", ingredient2.split(" ").join("_"));
                            if (ingredient3) params.append("ingredient3", ingredient3.split(" ").join("_"));
                            if (ingredient4) params.append("ingredient4", ingredient4.split(" ").join("_"));

                            router.push(`/results?${params.toString()}`);
                        }}


                        >Search Recipes</Button>
                    </ListGroupItem>


                </ListGroup>
            </Col>
        </Row>


    );

}