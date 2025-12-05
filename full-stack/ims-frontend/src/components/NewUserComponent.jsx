import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../services/UtilisateurService';
import { listCompanies } from '../services/EntrepriseService';
import { listRoles } from '../services/RolesService';

const NewUserComponent = () => {

    const { id } = useParams(); // si id existe → mode édition
    const navigate = useNavigate();

    const [user, setUser] = useState({
        nom: "",
        prenom: "",
        email: "",
        dateDeNaissance: "",
        motDePasse: "",
        photo: "",
        adresse: {
            adresse1: "",
            adresse2: "",
            ville: "",
            codePostal: "",
            pays: ""
        },
        entreprise: null,
        roles: []
    });

    const [entreprises, setEntreprises] = useState([]);
    const [roles, setRoles] = useState([]);

    const [loading, setLoading] = useState(true);

    // Charger les données en mode édition
    useEffect(() => {

        const loadData = async () => {
            try {
                const respEnt = await listCompanies();
                setEntreprises(respEnt.data || []);

                const respRoles = await listRoles();
                setRoles(respRoles.data || []);

                if (id) {
                    const respUser = await getUserById(id);
                    const u = respUser.data;

                    setUser({
                        ...u,
                        dateDeNaissance: u.dateDeNaissance?.substring(0, 10),
                        entreprise: u.entreprise,
                        roles: u.roles || []
                    });
                }
            } catch (error) {
                console.error(error);
            }

            setLoading(false);
        };

        loadData();

    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleAdresseChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            adresse: { ...prev.adresse, [name]: value }
        }));
    };

    const handleEntrepriseChange = (e) => {
        const entrepriseId = parseInt(e.target.value);
        const selected = entreprises.find(e => e.id === entrepriseId);
        setUser(prev => ({ ...prev, entreprise: selected || null }));
    };

    const handleRolesChange = (e) => {
        const options = Array.from(e.target.selectedOptions);
        const selectedRoles = options.map(o =>
            roles.find(r => r.id === parseInt(o.value))
        );
        setUser(prev => ({ ...prev, roles: selectedRoles }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            updateUser(id, user) 
                .then(() => navigate('/users'))
                .catch(err => console.error(err));
        } else {
            createUser(user)
                .then(() => navigate('/users'))
                .catch(err => console.error(err));
        }

    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="container my-4">

            <h2 className="text-center mb-4">
                {id ? "Modifier l'utilisateur" : "Créer un nouvel utilisateur"}
            </h2>

            <form onSubmit={handleSubmit} className="border p-4 rounded">

                {/* NOM */}
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nom"
                        value={user.nom}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* PRENOM */}
                <div className="mb-3">
                    <label className="form-label">Prénom</label>
                    <input
                        type="text"
                        className="form-control"
                        name="prenom"
                        value={user.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* DATE DE NAISSANCE */}
                <div className="mb-3">
                    <label className="form-label">Date de naissance</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dateDeNaissance"
                        value={user.dateDeNaissance}
                        onChange={handleChange}
                    />
                </div>

                {/* MOT DE PASSE (uniquement création) */}
                {!id && (
                    <div className="mb-3">
                        <label className="form-label">Mot de passe</label>
                        <input
                            type="password"
                            className="form-control"
                            name="motDePasse"
                            value={user.motDePasse}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                {/* PHOTO */}
                <div className="mb-3">
                    <label className="form-label">Photo (URL)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="photo"
                        value={user.photo}
                        onChange={handleChange}
                    />
                </div>

                {/* --- ADRESSE --- */}
                <h4 className="mt-4">Adresse</h4>

                <div className="mb-3">
                    <label className="form-label">Adresse 1</label>
                    <input
                        type="text"
                        className="form-control"
                        name="adresse1"
                        value={user.adresse.adresse1}
                        onChange={handleAdresseChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Adresse 2</label>
                    <input
                        type="text"
                        className="form-control"
                        name="adresse2"
                        value={user.adresse.adresse2}
                        onChange={handleAdresseChange}
                    />
                </div>

                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">Ville</label>
                        <input
                            type="text"
                            className="form-control"
                            name="ville"
                            value={user.adresse.ville}
                            onChange={handleAdresseChange}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label">Code Postal</label>
                        <input
                            type="text"
                            className="form-control"
                            name="codePostal"
                            value={user.adresse.codePostal}
                            onChange={handleAdresseChange}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label">Pays</label>
                        <input
                            type="text"
                            className="form-control"
                            name="pays"
                            value={user.adresse.pays}
                            onChange={handleAdresseChange}
                        />
                    </div>
                </div>

                {/* ENTREPRISE */}
                <div className="mb-3">
                    <label className="form-label">Entreprise</label>
                    <select
                        className="form-control"
                        onChange={handleEntrepriseChange}
                        value={user.entreprise?.id || ""}
                    >
                        <option value="">-- Aucune --</option>
                        {entreprises.map(ent => (
                            <option key={ent.id} value={ent.id}>
                                {ent.nom}
                            </option>
                        ))}
                    </select>
                </div>

                {/* ROLES */}
                <div className="mb-3">
                    <label className="form-label">Rôles</label>
                    <select
                        multiple
                        className="form-control"
                        onChange={handleRolesChange}
                        value={user.roles.map(r => r.id)}
                    >
                        {roles.map(r => (
                            <option key={r.id} value={r.id}>
                                {r.roleName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* SUBMIT */}
                <button type="submit" className="btn btn-success w-100 mt-3">
                    {id ? "Mettre à jour" : "Créer"}
                </button>

            </form>
        </div>
    );
};

export default NewUserComponent;
