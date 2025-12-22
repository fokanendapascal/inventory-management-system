import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, listUsers } from '../services/UtilisateurService';

const UtilisateursPage = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigator = useNavigate();

    /**
     * Récupère la liste des utilisateurs.
     * Mémorisée par useCallback pour la stabilité.
     */
    const getAllUsers = useCallback(() => {
        setLoading(true);
        setError(null); // Réinitialiser l'erreur avant de charger

        listUsers()
            .then(response => {
                setUsers(response.data || []);
            })
            .catch(err => {
                console.error("Erreur de chargement:", err);
                const backendError = err.response?.data?.message || "Impossible de charger les utilisateurs.";
                setError(backendError);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // Dépendances vides : la fonction est stable.

    // Déclenche le chargement des données au montage du composant.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getAllUsers();
    }, [getAllUsers]);

    const addNewUser = () => navigator('/add-user');

    const updateUser = (id) => navigator(`/edit-user/${id}`);

    const removeUser = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.")) {
            deleteUser(id)
                .then(() => {
                    // Recharger la liste si la suppression est réussie
                    getAllUsers();
                })
                .catch(err => {
                    console.error("Erreur de suppression:", err);
                    const backendError = err.response?.data?.message || "Erreur lors de la suppression. Vérifiez si l'utilisateur est lié à d'autres entités.";
                    setError(backendError);
                });
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center my-3">
                <h2 className="text-center">Liste des Utilisateurs</h2>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addNewUser}
                >
                    <i className="fa fa-plus"></i> &nbsp; Nouvel utilisateur
                </button>
            </div>

            {loading && <p className="text-center text-info">Chargement des utilisateurs...</p>}
            
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {!loading && users.length === 0 && !error && (
                <div className="alert alert-warning text-center">
                    Aucun utilisateur disponible dans la base de données.
                </div>
            )}

            {!loading && users.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Email</th>
                                <th>Date Naissance</th>
                                <th>Photo</th>
                                <th>Adresse (Ville, Pays)</th>
                                <th>Entreprise</th>
                                <th>Rôles</th>
                                <th style={{ width: "150px" }}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nom}</td>
                                    <td>{user.prenom}</td>
                                    <td>{user.email}</td>

                                    {/* Date formatée (garde YYYY-MM-DD) */}
                                    <td>{user.dateDeNaissance?.substring(0, 10)}</td>

                                    {/* Photo */}
                                    <td className="text-center">
                                        {user.photo ? (
                                            <img
                                                src={user.photo}
                                                alt="Photo utilisateur"
                                                width="40"
                                                height="40"
                                                className="rounded-circle" 
                                            />
                                        ) : "-"}
                                    </td>

                                    {/* Adresse */}
                                    <td>
                                        {user.adresse ? (
                                            // Utilise filter(Boolean) pour exclure les champs vides avant de joindre.
                                            [
                                                user.adresse.adresse1, 
                                                user.adresse.adresse2, 
                                                user.adresse.ville, 
                                                user.adresse.codePostal, 
                                                user.adresse.pays
                                            ].filter(Boolean).join(', ')
                                        ) : "Non renseignée"}
                                    </td>

                                    {/* Entreprise */}
                                    <td>
                                        {user.entreprise?.nom || "Aucune"}
                                    </td>

                                    {/* Rôles */}
                                    <td>
                                        {user.roles?.map(r => r.roleName).join(", ") || "Aucun rôle"}
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => updateUser(user.id)}
                                        >
                                            <i className="fa fa-edit"></i>
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeUser(user.id)}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default UtilisateursPage;