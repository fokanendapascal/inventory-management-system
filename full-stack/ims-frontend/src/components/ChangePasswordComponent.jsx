import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../services/UtilisateurService';

const ChangePasswordComponent = () => {

    const navigator = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        ancienMotDePasse: '',
        motDePasse: '',
        confirmMotDePasse: ''
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMsg('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (formData.motDePasse !== formData.confirmMotDePasse) {
            setErrorMsg("Les nouveaux mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);

        const payload = {
            email: formData.email,
            ancienMotDePasse: formData.ancienMotDePasse,
            motDePasse: formData.motDePasse,
            confirmMotDePasse: formData.confirmMotDePasse
        };

        changePassword(payload)
            .then(() => {
                setLoading(false);
                setSuccessMsg("Mot de passe changé avec succès !");
                setTimeout(() => navigator("/profil"), 1500);
            })
            .catch(error => {
                setLoading(false);
                setErrorMsg("Erreur lors du changement du mot de passe.");
                console.error(error);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Changer le mot de passe</h2>

            <div className="card p-4 mt-3">

                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                {successMsg && <div className="alert alert-success">{successMsg}</div>}

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            className="form-control" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mot de passe actuel</label>
                        <input 
                            type="password" 
                            name="ancienMotDePasse"
                            className="form-control" 
                            value={formData.ancienMotDePasse}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nouveau mot de passe</label>
                        <input 
                            type="password" 
                            name="motDePasse"
                            className="form-control" 
                            value={formData.motDePasse}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirmer le nouveau mot de passe</label>
                        <input 
                            type="password" 
                            name="confirmMotDePasse"
                            className="form-control" 
                            value={formData.confirmMotDePasse}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Changement..." : "Changer le mot de passe"}
                    </button>

                    <button 
                        type="button" 
                        className="btn btn-secondary ms-3"
                        onClick={() => navigator("/profil")}
                    >
                        Annuler
                    </button>

                </form>

            </div>
        </div>
    );
}

export default ChangePasswordComponent