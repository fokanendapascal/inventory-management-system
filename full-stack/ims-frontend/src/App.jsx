import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardComponent from "./components/DashboardComponent";
import ClientsPage from "./pages/ClientsPage";
import FournisseursPage from "./pages/FournisseursPage";
import './App.css';
import NewCltFrsComponent from "./components/NewCltFrsComponent";
import CltFrsPage from "./pages/CltFrsPage";
import CmdsCltsPage from "./pages/CmdsCltsPage";
import StatistiquesPage from "./pages/StatistiquesPage";
import ArticlesPage from "./pages/ArticlesPage";
import MvtStockPage from "./pages/MvtStockPage";
import UtilisateursPage from "./pages/UtilisateursPage";
import CategoriesPage from "./pages/CategoriesPage";
import NewCmdCltFrsComponent from "./components/NewCmdCltFrsComponent";
import CmdsFrsPage from "./pages/CmdsFrsPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route principale avec Dashboard */}
                <Route path="/" element={<DashboardComponent />}>
                   
                   {/* http://localhost:3003/statistiques */}
                    <Route path="statistiques" element={<StatistiquesPage />} /> 
                    <Route path="articles" element={<ArticlesPage/>} />
                    <Route path="mvtstock" element={<MvtStockPage/>} />

                    {/* Clients */}
                    <Route path="clients" element={<ClientsPage />} /> 
                    <Route path="add-client" element={<NewCltFrsComponent type="client" />} />
                    <Route path="edit-client/:id" element={<NewCltFrsComponent type="client" />} />

                    {/* Fournisseurs */}
                    <Route path="fournisseurs" element={<FournisseursPage />} />
                    <Route path="add-fournisseur" element={<NewCltFrsComponent type="fournisseur" />}/>
                    <Route path="edit-fournisseur/:id" element={<NewCltFrsComponent type="fournisseur" />} />

                    {/* Commandes Clients */}
                    <Route path="commandesclient" element={<CmdsCltsPage/>} />
                    <Route path="commandesclient/:id" element={<CmdsCltsPage />} />

                    {/* Commandes Fournisseurs */}
                    <Route path="commandesfournisseur" element={<CmdsFrsPage/>} />
                    <Route path="commandesfournisseur/:id" element={<CmdsFrsPage />} />

                    {/* Création / Édition commandes */}
                    <Route path="add-command/client" element={<NewCmdCltFrsComponent type="client" />} />
                    <Route path="edit-command/client/:id" element={<NewCmdCltFrsComponent type="client" />} />

                    <Route path="add-command/fournisseur" element={<NewCmdCltFrsComponent type="fournisseur" />} />
                    <Route path="edit-command/fournisseur/:id" element={<NewCmdCltFrsComponent type="fournisseur" />} />

                    <Route path="categories" element={<CategoriesPage/>} />
                    <Route path="utilisateurs" element={<UtilisateursPage/>} />                   
                    
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
