import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUser } from '../services/UtilisateurService';

const EditProfilComponent = () => {

    const navigator = useNavigate();

    const [user, setUser] = useState({
        id: '',
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
        photo: ''
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getCurrentUser()
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);

        updateUser(user.id, user)
            .then(() => {
                setSaving(false);
                navigator("/profil");  // redirection vers la page Profil
            })
            .catch(error => {
                console.error(error);
                setSaving(false);
            });
    };

    if (loading) return <div className="m-3">Chargement du formulaire...</div>;

    return (
        <div className="container mt-4">
            <h2>Modifier le profil</h2>

            <div className="card p-4 mt-3">

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Nom complet</label>
                        <input 
                            type="text" 
                            name="nom"
                            className="form-control" 
                            value={user.nom} 
                            onChange={handleChange} 
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            className="form-control" 
                            value={user.email} 
                            onChange={handleChange} 
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Téléphone</label>
                        <input 
                            type="text" 
                            name="telephone"
                            className="form-control" 
                            value={user.telephone} 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Adresse</label>
                        <input 
                            type="text" 
                            name="adresse"
                            className="form-control" 
                            value={user.adresse} 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">URL Photo</label>
                        <input 
                            type="text" 
                            name="photo"
                            className="form-control" 
                            value={user.photo} 
                            onChange={handleChange}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={saving}
                    >
                        {saving ? "Enregistrement..." : "Enregistrer"}
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

export default EditProfilComponent