"use client";
import { useState } from "react";
import RecipeMaker from "./recipes/RecipeMaker";
import { Button } from "react-bootstrap";
import Link from "next/link";
import "./FFStyles.css"


export default function FreestyleFood() {

    const [showCategories, setShowCategories] = useState(true);
    return (
        <div id="homescreen">
            <h1>Welcome to Freestyle Foods!</h1>
            <h5 className="m-3">Browse through recipes by category here, create and save your own 
                recipes under the "Recipes" tab, update account info under the 
                "Account" tab (after logging in) and explore recipes with keywords
                under the "explore" tab! Click the link below to visit the API
                that provides our recipes. 
            </h5>
            <Link href="https://www.themealdb.com" className="fs-5 m-2">API Link</Link>
            <br/>
            {!showCategories && 
            <Button className="flex-start ms-2 mt-3" variant="danger" onClick={() => {
                if (!showCategories) {
                    setShowCategories(!showCategories);
                }
            }}
            >Back to Categories</Button>
        }
        <RecipeMaker showCategories={showCategories} setShowCategories={setShowCategories} />
            

        </div>);
}