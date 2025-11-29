import React, { useEffect, useState } from 'react';
import { CmdClientService } from '../services/CmdCltService';
import { useNavigate } from 'react-router-dom';

const CmdsCltsPage = () => {
    const [cmdsClts, setCmdsClts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigator = useNavigate();

    /* =======================================================
       ✔ Charger la liste des commandes clients
    ======================================================== */
    useEffect(() => {
        const fetchCmds = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const res = await CmdClientService.listAll();
                setCmdsClts(res.data);
            } catch (err) {
                console.error('Erreur : ', err);
                setError('Impossible de charger les commandes clients.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCmds();
    }, []);

    /* =======================================================
       ✔ Ajouter nouvelle commande (client)
    ======================================================== */
    function addNewCmd() {
        navigator('/add-command/client');
    }

    /* =======================================================
       ✔ Modifier une commande
    ======================================================== */
    function updateCmdClt(id) {
        navigator(`/edit-command/client/${id}`);
    }

    /* =======================================================
       ✔ Supprimer
    ======================================================== */
    function removeCmdClt(id) {
        if (!window.confirm("Supprimer cette commande ?")) return;

        CmdClientService.remove(id)
            .then(() => {
                // Recharger la liste après suppression
                const reloadCmds = async () => {
                    try {
                        const res = await CmdClientService.listAll();
                        setCmdsClts(res.data);
                    } catch (err) {
                        console.error(err);
                    }
                };
                reloadCmds();
            })
            .catch(() => alert("Impossible de supprimer"));
    }

    /* =======================================================
         ⚠️ États de chargement & erreurs
    ======================================================== */
    if (isLoading) {
        return (
            <div className="container text-center mt-5">
                <p>Chargement...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container alert alert-danger mt-5">
                <h3>Erreur</h3>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={() => navigator(0)}>
                    Réessayer
                </button>
            </div>
        );
    }

    /* =======================================================
         Rendu principal
    ======================================================== */
    return (
        <div className="container">
            <h2>Commandes clients ({cmdsClts.length})</h2>

            <button className="btn btn-primary m-2" onClick={addNewCmd}>
                + Nouvelle commande client
            </button>

            <table className="table table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Nb lignes</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {cmdsClts.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Aucune commande trouvée.
                            </td>
                        </tr>
                    ) : (
                        cmdsClts.map(cmd => (
                            <tr key={cmd.id}>
                                <td>{cmd.code}</td>
                                <td>{cmd.dateCommande}</td>
                                <td>{cmd.client?.nom}</td>
                                <td>{cmd.lignesCommande?.length || 0}</td>
                                <td>
                                    {cmd.lignesCommande
                                        ?.reduce((s, l) => s + (l.prixUnitaire * l.quantite), 0)}
                                </td>

                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => updateCmdClt(cmd.id)}
                                    >
                                        Modifier
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeCmdClt(cmd.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CmdsCltsPage;
