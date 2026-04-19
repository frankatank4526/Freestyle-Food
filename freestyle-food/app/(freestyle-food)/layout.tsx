"use client"

import { ReactNode } from "react";
import FFNavigation from "./navigation";
import "./FFStyles.css";
export default function FFLayout({children}: Readonly<{ children: ReactNode}>) {

    return (
        <div id="FF-layout">
            <div className="d-flex">
                <div className="mb-auto" >
                    <FFNavigation/></div> 
                    <div className="ff-main-content flex-fill">
                        {children}</div>
            </div>

        </div>
    )
}