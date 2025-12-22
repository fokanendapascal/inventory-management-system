import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCompany } from '../services/EntrepriseService';

const InscriptionPage = () => {

    const navigator = useNavigate();

    // L'état reflète la structure du DTO backend (inclut les champs Admin)
    const [entreprise, setEntreprise] = useState({
        nom: '',
        codeFiscal: '',
        email: '',
        description: '',
        numTel: '',
        photo: '',
        siteWeb: '',
        // 🆕 CHAMPS ADMIN REQUIS
        nomAdmin: '', 
        prenomAdmin: '',
        // ----------------------
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

    // GESTION CHAMPS ENTREPRISE (et Admin)
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
            // Le DTO 'entreprise' contient maintenant les champs nomAdmin/prenomAdmin 
            await createCompany(entreprise);
            
            alert("Inscription réussie ! Redirection vers la page de connexion.");
            navigator('/login');

        } catch (err) {
            console.error("Erreur d'inscription:", err);
            // Améliorer la gestion d'erreur pour extraire le message du backend
            const backendError = err.response?.data?.message || err.message;
            setError(backendError || "Une erreur est survenue lors de l'inscription.");
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

                        {/* ======================================================= */}
                        {/* 🆕 SECTION ADMIN INITIAL */}
                        {/* ======================================================= */}
                        <h5 className="mt-4"><i className="fa fa-user blue-color"></i>&nbsp;Administrateur initial</h5>
                        <p className='text-muted small'>Cet utilisateur sera le premier administrateur de votre entreprise.</p>

                        <div className="row">
                            {/* Nom Admin */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Nom de l'Admin</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nom de l'administrateur"
                                    name="nomAdmin"
                                    value={entreprise.nomAdmin}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            {/* Prénom Admin */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Prénom de l'Admin</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Prénom de l'administrateur"
                                    name="prenomAdmin"
                                    value={entreprise.prenomAdmin}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                        </div>

                        <hr className="my-4"/>

                        {/* ======================================================= */}
                        {/* 🏢 SECTION DÉTAILS ENTREPRISE */}
                        {/* ======================================================= */}
                        <h5 className="mt-4"><i className="fa-solid fa-building blue-color"></i>&nbsp;Détails de l'entreprise</h5>

                        {/* Nom */}
                        <div className="mb-3">
                            <label className="form-label">Nom de l'entreprise</label>
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

                        {/* Email (utilisé comme login ADMIN) */}
                        <div className="mb-3">
                            <label className="form-label">Email (Login Admin)</label>
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Email (sera le login de l'admin)"
                                name="email"
                                value={entreprise.email}
                                onChange={handleChange}
                                required
                            />
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
                        
                        {/* Numéro de téléphone */}
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


                        {/* ======================================================= */}
                        {/* 📍 SECTION ADRESSE */}
                        {/* ======================================================= */}
                        <h5 className="mt-4"><i className="fa-solid fa-location-dot blue-color"></i>&nbsp;Adresse du siège</h5>
                        
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
                                    onChange={handleAdresseChange} 
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
                                    onChange={handleAdresseChange} 
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
                                    onChange={handleAdresseChange} 
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
                                    onChange={handleAdresseChange} 
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
                                    onChange={handleAdresseChange} 
                                />
                            </div>
                        </div>

                        {/* Boutons */}
                        <div className="mb-3 d-flex justify-content-between mt-4">
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary"
                                onClick={() => navigator('/login')} 
                            >
                                <i className="fa fa-sign-in-alt"></i> Se connecter
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={loading} 
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