import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, listUsers } from '../services/UtilisateurService';

const UtilisateursPage = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigator = useNavigate();

    const getAllUsers = () => {
        setLoading(true);

        listUsers()
            .then(response => {
                setUsers(response.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Impossible de charger les utilisateurs");
                setLoading(false);
            });
    };

    useEffect(() => {
        const fetchUser = async () => {
            await getAllUsers();
        }
        fetchUser();
    }, []);

    const addNewUser = () => navigator('/add-user');

    const updateUser = (id) => navigator(`/edit-user/${id}`);

    const removeUser = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
            deleteUser(id)
                .then(() => getAllUsers())
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between my-3">
                <h2 className="text-center">Liste des Utilisateurs</h2>

                <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={addNewUser}
                >
                    + Nouvel utilisateur
                </button>
            </div>

            {loading && <p className="text-center">Chargement des utilisateurs...</p>}
            {error && <p className="text-danger text-center">{error}</p>}

            {!loading && users.length === 0 && (
                <div className="alert alert-info text-center">
                    Aucun utilisateur disponible.
                </div>
            )}

            {!loading && users.length > 0 && (
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Date Naissance</th>
                            <th>Photo</th>
                            <th>Adresse</th>
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

                                {/* Date formatée */}
                                <td>{user.dateDeNaissance?.substring(0, 10)}</td>

                                {/* Photo */}
                                <td>
                                    {user.photo ? (
                                        <img
                                            src={user.photo}
                                            alt="Photo utilisateur"
                                            width="40"
                                            height="40"
                                            style={{ borderRadius: "50%" }}
                                        />
                                    ) : "Aucune"}
                                </td>

                                {/* Adresse */}
                                <td>
                                    {user.adresse
                                        ? `${user.adresse.adresse1}, ${user.adresse.ville}, ${user.adresse.pays}`
                                        : "Non renseignée"}
                                </td>

                                {/* Entreprise */}
                                <td>
                                    {user.entreprise ? user.entreprise.nom : "Aucune"}
                                </td>

                                {/* Rôles */}
                                <td>
                                    {user.roles && user.roles.length > 0
                                        ? user.roles.map(r => r.roleName).join(", ")
                                        : "Aucun rôle"}
                                </td>

                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => updateUser(user.id)}
                                    >
                                        Modifier
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeUser(user.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
};

export default UtilisateursPage;
