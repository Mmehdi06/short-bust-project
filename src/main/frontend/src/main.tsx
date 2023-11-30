import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "@/Home.tsx";
import Articles from "@/Articles.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/articles/:id",
        element: <Articles/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
