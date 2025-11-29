import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClient } from '../services/ClientService.js';

const CltFrsPage = () => {
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        // On met tout dans une fonction asynchrone pour éviter le warning ESLint
        const fetchClient = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await getClient(id);
                setClient(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération du client:", err);
                setError("Impossible de récupérer les données du client.");
            } finally {
                setLoading(false);
            }
        };

        fetchClient();

    }, [id]);

    if (loading) {
        return <div className='text-center mt-5'>Chargement des données du client...</div>;
    }

    if (error) {
        return <div className='text-center mt-5 text-danger'>{error}</div>;
    }

    if (!client) {
        return <div className='text-center mt-5'>Client avec l'ID {id} introuvable.</div>;
    }

    return (
        <div className='container mt-5'>
            <h2 className='mb-4'>Détails du Client (ID: {id})</h2>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    <p><strong>Nom :</strong> {client.nom} {client.prenom}</p>
                    <p><strong>Email :</strong> {client.mail}</p>
                    <p><strong>Téléphone :</strong> {client.numTel}</p>

                    {client.adresse && (
                        <div className='mt-3'>
                            <h5>Adresse :</h5>
                            <p>{client.adresse.adresse1}</p>
                            {client.adresse.adresse2 && <p>{client.adresse.adresse2}</p>}
                            <p>
                                {client.adresse.codePostal} {client.adresse.ville}, {client.adresse.pays}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CltFrsPage;
