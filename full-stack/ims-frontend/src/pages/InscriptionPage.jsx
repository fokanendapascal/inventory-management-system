import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCompany } from '../services/EntrepriseService';

const InscriptionPage = () => {

    const navigator = useNavigate();

    // L'état reflète la structure du DTO backend (Entreprise avec Adresse imbriquée)
    const [entreprise, setEntreprise] = useState({
        nom: '',
        codeFiscal: '',
        email: '',
        description: '',
        numTel: '',
        photo: '',
        siteWeb: '',
        adresse: {
            adresse1: '',
            adresse2: '',
            ville: '',
            codePostal: '',
            pays: '',
        }
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // GESTION CHAMPS ENTREPRISE (non adresse)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntreprise(prev => ({ ...prev, [name]: value }));
    };

    // GESTION CHAMPS ADRESSE
    const handleAdresseChange = (e) => {
        const { name, value } = e.target;
        setEntreprise(prev => ({
            ...prev,
            adresse: { ...prev.adresse, [name]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // ➡️ DTO FINAL ENVOYÉ:
            console.log("Tentative d'inscription avec:", entreprise);
            
            await createCompany(entreprise);
            
            alert("Inscription réussie ! Redirection vers la page de connexion.");
            navigator('/login');

        } catch (err) {
            console.error("Erreur d'inscription:", err);
            // Récupérer le message d'erreur du backend (ex: err.response.data.message)
            setError(err.message || "Une erreur est survenue lors de l'inscription.");
            setLoading(false);
        }
    };

    return (
        <div className="container my-container">
            <div className="card justify-content-md-center shadow-sm">

                <div className="card-header text-center bg-primary text-white">
                    <h3>S'inscrire (Entreprise)</h3>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        
                        {/* Afficher l'erreur si elle existe */}
                        {error && <div className="alert alert-danger">{error}</div>}

                        {/* Nom */}
                        <div className="mb-3">
                            <label className="form-label">Nom</label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Nom de l'entreprise"
                                name="nom"
                                value={entreprise.nom}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Code fiscal */}
                        <div className="mb-3">
                            <label className="form-label">Code fiscal</label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Code fiscal"
                                name="codeFiscal"
                                value={entreprise.codeFiscal}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={entreprise.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Photo URL */}
                        <div className="mb-3">
                            <label className="form-label">Photo (URL)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="photo"
                                placeholder="https://..."
                                value={entreprise.photo}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Site Web */}
                        <div className="mb-3">
                            <label className="form-label">Site Web</label>
                            <input
                                type="text"
                                className="form-control"
                                name="siteWeb"
                                placeholder="https://..."
                                value={entreprise.siteWeb}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Adresse */}
                        <h5 className="mt-4"><i className="fa-solid fa-location-dot blue-color"></i>&nbsp;Adresse</h5>
                        
                        {/* ADRESSE 1 & 2 */}
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Adresse 1</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Adresse 1"
                                    name="adresse1"
                                    value={entreprise.adresse.adresse1}
                                    onChange={handleAdresseChange} // <== Utilisation de handleAdresseChange
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Adresse 2</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Adresse 2"
                                    name="adresse2"
                                    value={entreprise.adresse.adresse2}
                                    onChange={handleAdresseChange} // <== Utilisation de handleAdresseChange
                                />
                            </div>
                        </div>

                        {/* VILLE, CODE POSTAL, PAYS */}
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Ville</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Ville"
                                    name="ville"
                                    value={entreprise.adresse.ville}
                                    onChange={handleAdresseChange} // <== Utilisation de handleAdresseChange
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Code postal</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Code postal"
                                    name="codePostal"
                                    value={entreprise.adresse.codePostal}
                                    onChange={handleAdresseChange} // <== Utilisation de handleAdresseChange
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Pays</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Pays"
                                    name="pays"
                                    value={entreprise.adresse.pays}
                                    onChange={handleAdresseChange} // <== Utilisation de handleAdresseChange
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea 
                                className="form-control"
                                placeholder="Description"
                                name="description"
                                rows="3"
                                value={entreprise.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        {/* Téléphone */}
                        <div className="mb-3">
                            <label className="form-label">Numéro de téléphone</label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="+237..."
                                name="numTel"
                                value={entreprise.numTel}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Boutons */}
                        <div className="mb-3 d-flex justify-content-between">
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary"
                                onClick={() => navigator('/login')} // <== Redirection vers login
                            >
                                <i className="fa fa-sign-in-alt"></i> Se connecter
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={loading} // <== Désactiver pendant le chargement
                            >
                                {loading ? 'En cours...' : (
                                    <>
                                        <i className="fa fa-check"></i> S'inscrire
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default InscriptionPage;