import React, { useEffect, useState } from 'react';
import { listClients, deleteClient } from '../services/ClientService.js';
import { useNavigate } from 'react-router-dom';

const ClientsPage = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    // Récupérer tous les clients
    const getAllClients = () => {
        listClients()
            .then((res) => {
            setClients(res.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getAllClients();
    }, []);

    const addNewClient = () => navigate('/add-client');
    const updateClient = (id) => navigate(`/edit-client/${id}`);

    const removeClient = (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer ce client ?')) {
            deleteClient(id)
            .then(() => {
                getAllClients(); // rafraîchir la liste après suppression
            })
            .catch((err) => console.error(err));
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Liste des clients</h2>
            <br />
            <button className="btn btn-primary mb-3" onClick={addNewClient}>
            + Nouveau
            </button>

            <table className="table table-striped table-bordered">
            <thead>
                <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Adresse 1</th>
                <th>Adresse 2</th>
                <th>Ville</th>
                <th>Code Postal</th>
                <th>Pays</th>
                <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {clients.map((client) => (
                <tr key={client.id}>
                    <td>{client.id}</td>
                    <td>{client.nom}</td>
                    <td>{client.prenom}</td>
                    <td>{client.mail}</td>
                    <td>{client.numTel}</td>
                    <td>{client.adresse.adresse1}</td>
                    <td>{client.adresse.adresse2}</td>
                    <td>{client.adresse.ville}</td>
                    <td>{client.adresse.codePostal}</td>
                    <td>{client.adresse.pays}</td>
                    <td>
                        <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() => updateClient(client.id)}
                        >
                            Modifier
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeClient(client.id)}
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default ClientsPage;
