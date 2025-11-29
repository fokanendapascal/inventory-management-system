import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Services
import { createClient, getClient, updateClient } from '../services/ClientService';
import { createFournisseur, getFournisseur, updateFournisseur } from '../services/FournisseurService';

const NewCltFrsComponent = ({ type }) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [mail, setMail] = useState('');
    const [numTel, setNumTel] = useState('');
    const [adresse1, setAdresse1] = useState('');
    const [adresse2, setAdresse2] = useState('');
    const [ville, setVille] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [pays, setPays] = useState('');

    const [errors, setErrors] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    // Définition dynamique du service client/fournisseur
    const service = useMemo(() => 
        type === "client"
        ? { get: getClient, create: createClient, update: updateClient, redirect: "/clients" }
        : { get: getFournisseur, create: createFournisseur, update: updateFournisseur, redirect: "/fournisseurs" }
    , [type]);

    // Charger les données en mode édition
    useEffect(() => {
        if (!id) return;

        service.get(id)
        .then(response => {
            const data = response.data;
            setNom(data.nom || '');
            setPrenom(data.prenom || '');
            setMail(data.mail || '');
            setNumTel(data.numTel || '');
            setAdresse1(data.adresse?.adresse1 || '');
            setAdresse2(data.adresse?.adresse2 || '');
            setVille(data.adresse?.ville || '');
            setCodePostal(data.adresse?.codePostal || '');
            setPays(data.adresse?.pays || '');
        })
        .catch(console.error);
    }, [id, service]);

    // Validation simple
    const validateForm = () => {
        const errs = {};
        if (!nom.trim()) errs.nom = "Nom requis";
        if (!prenom.trim()) errs.prenom = "Prénom requis";
        if (!mail.trim()) errs.mail = "Email requis";
        if (!numTel.trim()) errs.numTel = "Téléphone requis";
        if (!adresse1.trim()) errs.adresse1 = "Adresse 1 requise";
        if (!ville.trim()) errs.ville = "Ville requise";
        if (!codePostal.trim()) errs.codePostal = "Code postal requis";
        if (!pays.trim()) errs.pays = "Pays requis";

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // Création / mise à jour
    const saveOrUpdateCltFrs = (e) => {
        e.preventDefault();

        if(!validateForm()) return;

        const payload = { nom, prenom, mail, numTel, adresse: { adresse1, adresse2, ville, codePostal, pays } };
        console.log(payload);

        if(id){
            service.update(id, payload).then((response) => {
                console.log(response.data);
                navigate(service.redirect);
            }).catch(error => {
                console.error(error);
            })
        }else{
            service.create(payload).then((response) => {
                console.log(response.data);
                navigate(service.redirect);
            }).catch(error => {
                console.error(error);
            })
        }

    };

    return (
        <div className='container'>
        <div className='col m-3'>
            {/* Titre dynamique */}
            <h2 className="mb-4">
            {id ? "Modifier" : "Nouveau"} {type === "client" ? "Client" : "Fournisseur"}
            </h2>

            <form className="col-md-12" onSubmit={saveOrUpdateCltFrs}>
            {/* --- SECTION IDENTITÉ --- */}
            <h3 className="mt-3"><i className="fa-solid fa-circle-info blue-color"></i>&nbsp;Informations</h3>

            <div className="row mb-3">
                <div className='col-md-6'>
                <label className='form-label'>Nom</label>
                <input type='text' className={`form-control ${errors.nom ? "is-invalid" : ""}`} value={nom} onChange={e => setNom(e.target.value)} />
                {errors.nom && <div className='invalid-feedback'>{errors.nom}</div>}
                </div>
                <div className='col-md-6'>
                <label className='form-label'>Prénom</label>
                <input type='text' className={`form-control ${errors.prenom ? "is-invalid" : ""}`} value={prenom} onChange={e => setPrenom(e.target.value)} />
                {errors.prenom && <div className='invalid-feedback'>{errors.prenom}</div>}
                </div>
            </div>

            <div className="row mb-3">
                <div className='col-md-6'>
                <label className='form-label'>Email</label>
                <input type='email' className={`form-control ${errors.mail ? "is-invalid" : ""}`} value={mail} onChange={e => setMail(e.target.value)} />
                {errors.mail && <div className='invalid-feedback'>{errors.mail}</div>}
                </div>
                <div className='col-md-6'>
                <label className='form-label'>Téléphone</label>
                <input type='text' className={`form-control ${errors.numTel ? "is-invalid" : ""}`} value={numTel} onChange={e => setNumTel(e.target.value)} />
                {errors.numTel && <div className='invalid-feedback'>{errors.numTel}</div>}
                </div>
            </div>

            {/* --- SECTION ADRESSE --- */}
            <h3 className="mt-4"><i className="fa-solid fa-location-dot blue-color"></i>&nbsp;Adresse</h3>

            <div className="row mb-3">
                <div className='col-md-6'>
                <label className='form-label'>Adresse 1</label>
                <input type='text' className={`form-control ${errors.adresse1 ? "is-invalid" : ""}`} value={adresse1} onChange={e => setAdresse1(e.target.value)} />
                {errors.adresse1 && <div className='invalid-feedback'>{errors.adresse1}</div>}
                </div>
                <div className='col-md-6'>
                <label className='form-label'>Adresse 2 (optionnel)</label>
                <input type='text' className='form-control' value={adresse2} onChange={e => setAdresse2(e.target.value)} />
                </div>
            </div>

            <div className="row mb-3">
                <div className='col-md-6'>
                <label className='form-label'>Ville</label>
                <input type='text' className={`form-control ${errors.ville ? "is-invalid" : ""}`} value={ville} onChange={e => setVille(e.target.value)} />
                {errors.ville && <div className='invalid-feedback'>{errors.ville}</div>}
                </div>
                <div className='col-md-6'>
                <label className='form-label'>Code Postal</label>
                <input type='text' className={`form-control ${errors.codePostal ? "is-invalid" : ""}`} value={codePostal} onChange={e => setCodePostal(e.target.value)} />
                {errors.codePostal && <div className='invalid-feedback'>{errors.codePostal}</div>}
                </div>
            </div>

            <div className='row mb-4'>
                <div className='col-md-6'>
                <label className='form-label'>Pays</label>
                <input type='text' className={`form-control ${errors.pays ? "is-invalid" : ""}`} value={pays} onChange={e => setPays(e.target.value)} />
                {errors.pays && <div className='invalid-feedback'>{errors.pays}</div>}
                </div>
            </div>

            {/* --- Boutons --- */}
            <div className='d-flex justify-content-end'>
                <button type="submit" className="btn btn-primary me-2">Enregistrer</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Annuler</button>
            </div>

            </form>
        </div>
        </div>
    );
};

export default NewCltFrsComponent;
