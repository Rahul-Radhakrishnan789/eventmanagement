import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ProSidebarProvider } from "react-pro-sidebar";
ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
            <ProSidebarProvider>
                <App />
            </ProSidebarProvider>
    </BrowserRouter>
);
