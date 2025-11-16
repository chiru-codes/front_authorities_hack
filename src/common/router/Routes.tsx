import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import App from "../../App";
import LoginPage from "../pages/auth/LoginPage.tsx"
import RegisterPage from "../pages/auth/RegisterPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import ReportIncidentPage from "../pages/incidents/ReportIncidentPage";
import DetailsIncidentPage from "../pages/incidents/DetailsIncidentPage.tsx";
import DashboardIncidentPage from "../pages/incidents/DashboardIncidentPage.tsx";
import FeedAdminPage from "../pages/admin/FeedAdminPage.tsx";
import FeedSolverPage from "../pages/solver/FeedSolverPage.tsx";

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
                    // USER - ADMIN - SOLVER
                    { path: "incidents/report", element: <ReportIncidentPage /> },
                    { path: "incidents/details/:id", element: <DetailsIncidentPage />},
                    { path: "incidents/dashboard", element: <DashboardIncidentPage />},

                    // ADMIN
                    { path: "admin/feed", element: <FeedAdminPage />},

                    // SOLVER
                    { path: "solver/feed", element: <FeedSolverPage />},
                ],
            },
        ],
    },
]);