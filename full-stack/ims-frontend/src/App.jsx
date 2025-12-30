import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import ClientsPage from "./pages/ClientsPage";
import FournisseursPage from "./pages/FournisseursPage";
import "./App.css";

import NewCltFrsComponent from "./components/NewCltFrsComponent";
import CltFrsPage from "./pages/CltFrsPage";
import CmdsCltsPage from "./pages/CmdsCltsPage";
import OverviewPage from "./pages/OverviewPage.jsx";
import StatistiquesPage from "./pages/StatistiquesPage";
import ArticlesPage from "./pages/ArticlesPage";
import MvtStockPage from "./pages/MvtStockPage";
import UtilisateursPage from "./pages/UtilisateursPage";
import CategoriesPage from "./pages/CategoriesPage";
import NewCmdCltFrsComponent from "./components/NewCmdCltFrsComponent";
import CmdsFrsPage from "./pages/CmdsFrsPage";

import NewArticleComponent from "./components/NewArticleComponent";
import NewCategoryComponent from "./components/NewCategoryComponent";
import NewUserComponent from "./components/NewUserComponent";

import ProfilPage from "./pages/ProfilPage";
import EditProfilComponent from "./components/EditProfilComponent";
import ChangePasswordComponent from "./components/ChangePasswordComponent";

import InscriptionPage from "./pages/InscriptionPage";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ------------ ROUTES PUBLIQUES ---------------- */}
                <Route element={<PublicLayout />}>
                    <Route path="/inscription" element={<InscriptionPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/change-password" element={<ChangePasswordComponent />} />
                </Route>


                {/* ------------ ROUTES PROTÉGÉES ---------------- */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<PrivateLayout />}>

                        {/* DASHBOARD / HOME */}
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<OverviewPage />} />

                        {/* Statistiques */}
                        <Route path="statistiques" element={<StatistiquesPage />} />

                        {/* Articles */}
                        <Route path="articles" element={<ArticlesPage />} />
                        <Route path="add-article" element={<NewArticleComponent />} />
                        <Route path="edit-article/:id" element={<NewArticleComponent />} />
                        <Route path="mvtstock" element={<MvtStockPage />} />

                        {/* Clients */}
                        <Route path="clients" element={<ClientsPage />} />
                        <Route path="add-client" element={<NewCltFrsComponent type="client" />} />
                        <Route path="edit-client/:id" element={<NewCltFrsComponent type="client" />} />

                        {/* Fournisseurs */}
                        <Route path="fournisseurs" element={<FournisseursPage />} />
                        <Route path="add-fournisseur" element={<NewCltFrsComponent type="fournisseur" />} />
                        <Route path="edit-fournisseur/:id" element={<NewCltFrsComponent type="fournisseur" />} />

                        {/* Commandes Clients */}
                        <Route path="commandesclient" element={<CmdsCltsPage />} />
                        <Route path="commandesclient/details/:id" element={<CmdsCltsPage />} />

                        {/* Commandes Fournisseurs */}
                        <Route path="commandesfournisseur" element={<CmdsFrsPage />} />
                        <Route path="commandesfournisseur/details/:id" element={<CmdsFrsPage />} />

                        {/* Création / Édition commandes */}
                        <Route path="add-command/client" element={<NewCmdCltFrsComponent type="client" />} />
                        <Route path="edit-command/client/:id" element={<NewCmdCltFrsComponent type="client" />} />
                        <Route path="add-command/fournisseur" element={<NewCmdCltFrsComponent type="fournisseur" />} />
                        <Route path="edit-command/fournisseur/:id" element={<NewCmdCltFrsComponent type="fournisseur" />} />

                        {/* Catégories */}
                        <Route path="categories" element={<CategoriesPage />} />
                        <Route path="add-category" element={<NewCategoryComponent />} />
                        <Route path="edit-category/:id" element={<NewCategoryComponent />} />

                        {/* Utilisateurs */}
                        <Route path="utilisateurs" element={<UtilisateursPage />} />
                        <Route path="add-user" element={<NewUserComponent />} />
                        <Route path="edit-user/:id" element={<NewUserComponent />} />

                        {/* Profil */}
                        <Route path="profil" element={<ProfilPage />} />
                        <Route path="edit-profil" element={<EditProfilComponent />} />

                    </Route>
                </Route>

                {/* ------------- 404 OPTIONNEL ------------- */}
                {/* <Route path="*" element={<NotFoundPage />} /> */}

            </Routes>
        </BrowserRouter>
    );
}

export default App;
