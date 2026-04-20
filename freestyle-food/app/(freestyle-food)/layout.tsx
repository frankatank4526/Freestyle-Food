"use client"

import { ReactNode } from "react";
import FFNavigation from "./navigation";
import "./FFStyles.css";
import Session from "./account/Session";
import { Provider } from "react-redux";
import store from "./store";
export default function FFLayout({ children }: Readonly<{ children: ReactNode }>) {

    return (
        <Provider store={store}>
            <Session>
                <div id="FF-layout">
                    <div className="d-flex">
                        <div className="m-2" >
                            <FFNavigation /></div>
                        <div className="ff-main-content flex-fill">
                            {children}</div>
                    </div>

                </div>
            </Session>
        </Provider>
    )
}