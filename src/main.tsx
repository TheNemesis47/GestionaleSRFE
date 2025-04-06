import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProductPage from "./pages/ProductPage.tsx"; // Importa la pagina dei prodotti
import PrivateRoute from "./components/PrivateRoute.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import SupplierPage from "./pages/SupplierPage.tsx";

const router = createBrowserRouter([
    {path: "/login", element: <LoginPage/>},
    {path: "/register", element: <RegisterPage/>},
    {path: "/products", element: <PrivateRoute/>, children: [{path: "", element: <ProductPage/>}]}, // ROUTE PER PRODOTTI
    {path: "/suppliers", element: <PrivateRoute/>, children: [{path: "", element: <SupplierPage/>}]}, //Route per Fornitore
    {
        path: "/dashboard",
        element: <PrivateRoute/>,
        children: [{path: "", element: <Dashboard/>}],
    },
    {
        path: "/", element: <PrivateRoute/>, children: [{path: "", element: <Dashboard/>}],
    },
    {path: "*", element: <NotFoundPage/>}, // Pagina 404
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);