import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/UtilisateurService';
import { useNavigate } from 'react-router-dom';

const ProfilPage = () => {

    const [user, setUser] = useState(null);

    const navigator = useNavigate();

    useEffect(() => {
        getCurrentUser()
            .then(response => {
                setUser(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    if (!user) {
        return <div className="m-3">Chargement du profil...</div>;
    }

    return (        
        <div className="row m-3">
            <div className="card col-md-5 me-3 text-center">
                <div className="col">
                    <div className="mb-3 mt-3">
                        <img 
                            src={user.photo} 
                            className="rounded-circle" 
                            width="150px" 
                            height="150px" 
                            alt="profil"
                        />
                    </div>
                    <div className="mb-3">
                        <h2>{user.nom}</h2>
                        <small className="form-text text-muted">
                            {user.adresse ? (
                                <>
                                    {user.adresse.adresse1} <br />
                                    {user.adresse.adresse2 && <>{user.adresse.adresse2}<br /></>}
                                    {user.adresse.ville}, {user.adresse.codePostal}, {user.adresse.pays}
                                </>
                            ) : (
                                "Aucune adresse"
                            )}
                        </small>
                    </div>

                    <div className="col mb-3">
                        <button 
                            type="button" 
                            className="btn btn-primary me-3"
                            onClick={() => navigator('/edit-profil')}
                        >
                            <i className="fa-solid fa-pencil"></i>&nbsp;
                            Modifier le profil
                        </button>

                        <button 
                            type="button" 
                            className="btn btn-warning"
                            onClick={() => navigator('/change-password')}
                        >
                            <i className="fa-solid fa-lock"></i>&nbsp;
                            Changer le mot de passe
                        </button>
                    </div>
                </div>
            </div>

            <div className="card col-md-6">
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row">Nom complet</th>
                            <td>{user.nom}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">Téléphone</th>
                            <td>{user.telephone}</td>
                        </tr>
                        <tr>
                            <th scope="row">Adresse</th>
                            <td>
                                {user.adresse ? (
                                    <>
                                        {user.adresse.adresse1} <br />
                                        {user.adresse.adresse2 && <>{user.adresse.adresse2}<br /></>}
                                        {user.adresse.ville}, {user.adresse.codePostal}, {user.adresse.pays}
                                    </>
                                ) : (
                                    "Aucune adresse"
                                )}
                            </td>
                             
                        </tr>
                        <tr>
                            <th scope="row">Entreprise</th>
                            <td>{user.entreprise}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProfilPage;
