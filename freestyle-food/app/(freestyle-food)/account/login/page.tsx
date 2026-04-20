"use client"

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { redirect, useRouter } from "next/navigation";
import * as client from "../client"
import Link from "next/link";
import { FormControl, Button } from "react-bootstrap";
import "../../FFStyles.css";
export default function Login() {
    const [credentials, setCredentials] = useState<any>({});
    const router = useRouter();
    const dispatch = useDispatch();
    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        redirect("/");
    };
    return (
        <div id="ff-signin-screen">
            <h1>Sign in</h1>
            <br/>
            <FormControl id="ff-username"
                defaultValue={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="username"
                className="mb-2" />
            <FormControl id="ff-password"
                defaultValue={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="password" type="password"
                className="mb-2" />
            <Button variant="primary" id="ff-signin-btn" onClick={signin}

                className="btn btn-primary mb-2">
                Sign in </Button> 
            <Button id="ff-signup-btn" variant="secondary" onClick={() => router.push("/account/register")}

                className="btn btn-primary mb-2">
                Register </Button> 
        </div>);
}