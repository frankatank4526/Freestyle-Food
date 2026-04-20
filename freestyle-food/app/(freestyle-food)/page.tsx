"use client";
import { useState } from "react";
import RecipeMaker from "./recipes/RecipeMaker";
import { Button } from "react-bootstrap";


export default function FreestyleFood() {

    const [showCategories, setShowCategories] = useState(true);
    return (
        <div id="homescreen">
            <Button className="flex-start ms-2" variant="danger" onClick={() => {
                if (!showCategories) {
                    setShowCategories(!showCategories);
                }
            }}
            >Back to Categories</Button>
        <RecipeMaker showCategories={showCategories} setShowCategories={setShowCategories} />
            <h3>Login to see favorites, placeholder</h3>

        </div>);
}