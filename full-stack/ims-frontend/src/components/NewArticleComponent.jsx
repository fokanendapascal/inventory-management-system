import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getArticle, updateArticle, createArticle } from '../services/ArticleService';
import { listCategories } from '../services/CategoryService';

const NewArticleComponent = () => {
    const [formArt, setFormArt] = useState({
        codeArticle: '',
        designation: '',
        prixUnitaireHt: '',
        tauxTva: '',
        prixUnitaireTtc: '',
        photo: '',
        categoryId: '',
        idEntreprise: ''
    });

    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigator = useNavigate();

    // Charger les catégories
    useEffect(() => {
        listCategories()
        .then(res => setCategories(res.data))
        .catch(err => console.error("Erreur chargement categories", err));
    }, []);

    // Charger un article existant
    useEffect(() => {
        if (!id) return;

        getArticle(id)
        .then(res => {
            const art = res.data;
            setFormArt({
            codeArticle: art.codeArticle || '',
            designation: art.designation || '',
            prixUnitaireHt: art.prixUnitaireHt || '',
            tauxTva: art.tauxTva || '',
            prixUnitaireTtc: art.prixUnitaireTtc || '',
            photo: art.photo || '',
            idEntreprise: art.idEntreprise || '',
            categoryId: art.category ? art.category.id : ''
            });
        })
        .catch(err => console.error(err));
    }, [id]);

    // Gestion générique
    const handleChange = (e) => {
        setFormArt(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    // Calcul automatique TTC
    const calculateTtc = (ht, tva) => {
        const htNum = parseFloat(ht) || 0;
        const tvaNum = parseFloat(tva) || 0;
        return (htNum + htNum * tvaNum / 100).toFixed(2);
    };

    const handleHtChange = (e) => {
        const ht = e.target.value;
        const ttc = calculateTtc(ht, formArt.tauxTva);
        setFormArt(prev => ({ ...prev, prixUnitaireHt: ht, prixUnitaireTtc: ttc }));
    };

    const handleTvaChange = (e) => {
        const tva = e.target.value;
        const ttc = calculateTtc(formArt.prixUnitaireHt, tva);
        setFormArt(prev => ({ ...prev, tauxTva: tva, prixUnitaireTtc: ttc }));
    };

    // Validation
    const validateForm = () => {
        const errs = {};

        // Champs texte
        if (!formArt.codeArticle.trim()) errs.codeArticle = 'Code article requis';
        if (!formArt.designation.trim()) errs.designation = 'Désignation requise';

        // Champs numériques
        if (formArt.prixUnitaireHt === '' || isNaN(formArt.prixUnitaireHt)) errs.prixUnitaireHt = 'Prix HT requis';
        if (formArt.tauxTva === '' || isNaN(formArt.tauxTva)) errs.tauxTva = 'TVA requise';

        // Catégorie
        if (!formArt.categoryId) errs.categoryId = 'Catégorie requise';

        // ID entreprise (peut être nombre ou chaîne)
        if (!formArt.idEntreprise || formArt.idEntreprise.toString().trim() === '') errs.idEntreprise = 'ID entreprise requis';

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };


    // Soumission
    const saveOrUpdateArticle = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            codeArticle: formArt.codeArticle,
            designation: formArt.designation,
            prixUnitaireHt: parseFloat(formArt.prixUnitaireHt),
            tauxTva: parseFloat(formArt.tauxTva),
            prixUnitaireTtc: parseFloat(formArt.prixUnitaireTtc),
            photo: formArt.photo,
            idEntreprise: formArt.idEntreprise,
            category: { id: parseInt(formArt.categoryId) }
        };

        if(id){
            updateArticle(id, payload)
            .then(response => {
                console.log("Article mis à jour :", response.data);
                navigator('/articles');
            })
            .catch(error => console.error(error));
        }else{
            createArticle(payload)
            .then(response => {
                console.log("Article enregistré :", response.data);
                navigator('/articles');
            })
            .catch(error => console.error(error));
        }
        
    };

    return (
        <div className="container mt-4">
        <h3 className="mb-3">{id ? "Modifier l'article" : "Créer un article"}</h3>

        <form onSubmit={saveOrUpdateArticle}>

            <div className='row mb-3'>
            <div className="col-md-6">
                <label>Code article</label>
                <input type="text" name="codeArticle" className="form-control" value={formArt.codeArticle} onChange={handleChange} />
                {errors.codeArticle && <small className="text-danger">{errors.codeArticle}</small>}
            </div>

            <div className="col-md-6">
                <label>Désignation</label>
                <input type="text" name="designation" className="form-control" value={formArt.designation} onChange={handleChange} />
                {errors.designation && <small className="text-danger">{errors.designation}</small>}
            </div>
            </div>

            <div className='row mb-3'>
            <div className="col-md-6">
                <label>Prix unitaire HT</label>
                <input type="number" name="prixUnitaireHt" className="form-control" value={formArt.prixUnitaireHt} onChange={handleHtChange} />
                {errors.prixUnitaireHt && <small className="text-danger">{errors.prixUnitaireHt}</small>}
            </div>

            <div className="col-md-6">
                <label>Taux TVA (%)</label>
                <input type="number" name="tauxTva" className="form-control" value={formArt.tauxTva} onChange={handleTvaChange} />
                {errors.tauxTva && <small className="text-danger">{errors.tauxTva}</small>}
            </div>
            </div>

            <div className='row mb-3'>
            <div className="col-md-6">
                <label>Prix unitaire TTC</label>
                <input type="number" readOnly name="prixUnitaireTtc" className="form-control" value={formArt.prixUnitaireTtc} />
            </div>

            <div className="col-md-6">
                <label>Catégorie</label>
                <select name="categoryId" className="form-select" value={formArt.categoryId} onChange={handleChange}>
                <option value="">-- Sélectionner une catégorie --</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                    {cat.code} — {cat.designation}
                    </option>
                ))}
                </select>
                {errors.categoryId && <small className="text-danger">{errors.categoryId}</small>}
            </div>
            </div>

            <div className='row mb-4'>
            <div className="col-md-6">
                <label>ID Entreprise</label>
                <input type="text" name="idEntreprise" className="form-control" value={formArt.idEntreprise} onChange={handleChange} />
                {errors.idEntreprise && <small className="text-danger">{errors.idEntreprise}</small>}
            </div>
            </div>

            <div className='d-flex justify-content-end'>
            <button type='submit' className="btn btn-primary me-2">Enregistrer</button>
            <button type='button' className='btn btn-secondary' onClick={()=> navigator(-1)}>Annuler</button>
            </div>

        </form>
        </div>
    );
};

export default NewArticleComponent;
