"use client"

import RecipeMaker from "./RecipeMaker";
import { RootState } from "../store";
import * as client from "./client";
import { useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RecipeHome() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const router = useRouter();

    return(
        <div id="recipe-home" className="d-flex">
            {currentUser? 
            <Row>
                <Col xs={12} md={6}>
                    <Button variant="success" onClick={() => 
                        router.push(`/recipes/new`)
                    }> Create Recipe</Button>
                </Col>
                <Col xs={12} md={6}>
                    <Button onClick={() => router.push("/recipes/saved")}variant="info"> Saved Recipes</Button>
                </Col>
               
                

            </Row>
            : <div> <Link href="/account/login" className="fs-2">Login </Link> <span className="fs-2">or </span>
                <Link href="/account/register" className="fs-2">register </Link> <span className="fs-2"> to view your saved recipes 
                    or create new ones here!
                </span>
                </div>
        }

       

        </div>



    );



}