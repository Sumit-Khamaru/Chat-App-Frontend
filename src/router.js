import React from "react";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Chat from "./Componenets/Chat/Chat";
import Join from "./Componenets/Join/Join";
import ErrorPage from "./ErrorPage";
import ProfilePage from "./Pages/ProfilePage";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Join />,
        errorElement: <ErrorPage />,
    },
    {path: "/register", element: <Join />},

    { path: '/chats', element: <Chat /> },

    { path: '/myprofile', element: <ProfilePage /> },
]);

export default router