import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import App from "../../App";
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ReportIncidentPage from "../pages/incidents/ReportIncidentPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace />,
            },


            {
                element: <PublicRoute />,
                children: [
                    { path: "auth/login", element: <LoginPage /> },
                    { path: "auth/register", element: <RegisterPage /> },
                    { path: "home", element: <HomePage /> },
                ],
            },


            {
                element: <ProtectedRoute />,
                children: [
                    { path: "incidents/report", element: <ReportIncidentPage /> },
                ],
            },
        ],
    },
]);