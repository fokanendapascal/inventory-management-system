import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CmdClientService } from '../services/CmdCltService';
import { CmdFournisseurService } from '../services/CmdFrsService';
import { listClients } from '../services/ClientService';
import { listFournisseurs } from '../services/FournisseurService';
import { listArticles } from '../services/ArticleService';

const NewCmdCltFrsComponent = ({type}) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Infos commande
    const [code, setCode] = useState('');
    const [dateCommande, setDateCommande] = useState('');
    const [partenaireId, setPartenaireId] = useState('');

    // Données externes
    const [partenaires, setPartenaires] = useState([]);
    const [articles, setArticles] = useState([]);

    // Ligne de commande
    const [articleId, setArticleId] = useState('');
    const [quantite, setQuantite] = useState('');
    const [prixUnitaire, setPrixUnitaire] = useState('');
    const [lignes, setLignes] = useState([]);

    const service = type === 'client' ? CmdClientService : CmdFournisseurService;

    // Charger partenaires et articles
    useEffect(() => {
        const fetchData = async () => {
        try {
            const parten = type === 'client' ? await listClients() : await listFournisseurs();
            setPartenaires(parten.data);

            const arts = await listArticles();
            setArticles(arts.data);
        } catch (err) {
            console.error(err);
        }
        };
        fetchData();
    }, [type]);

    // Mode édition
    useEffect(() => {
        if (!id) return;

        const fetchCommande = async () => {
        try {
            const res = await service.get(id);
            const cmd = res.data;

            setCode(cmd.code);
            setDateCommande(cmd.dateCommande);
            setPartenaireId(cmd.clientId || cmd.fournisseurId);
            setLignes(cmd.lignesCommande || []);
        } catch (err) {
            console.error(err);
        }
        };
        fetchCommande();
    }, [id, service]);

    // Sélection article
    const handleArticleChange = (e) => {
        const selectedId = e.target.value;
        setArticleId(selectedId);

        const art = articles.find((a) => a.id === Number(selectedId));
        setPrixUnitaire(art?.prixUnitaire || '');
    };

    // Ajouter ligne
    const addLine = () => {
        if (!articleId || !quantite || !prixUnitaire) {
        alert('Veuillez remplir toutes les informations.');
        return;
        }

        const art = articles.find((a) => a.id === Number(articleId));

        const newLine = {
        articleId: Number(articleId),
        articleCode: art.code,
        quantite: Number(quantite),
        prixUnitaire: Number(prixUnitaire),
        total: Number(quantite) * Number(prixUnitaire),
        };

        setLignes([...lignes, newLine]);
        setArticleId('');
        setQuantite('');
        setPrixUnitaire('');
    };

    // Enregistrer ou mettre à jour
    const saveOrUpdate = async (e) => {
        e.preventDefault();

        if (!code || !dateCommande || !partenaireId || lignes.length === 0) {
        alert('Veuillez remplir toutes les informations de la commande.');
        return;
        }

        const payload = {
        code,
        dateCommande,
        lignes,
        clientId: type === 'client' ? Number(partenaireId) : undefined,
        fournisseurId: type === 'fournisseur' ? Number(partenaireId) : undefined,
        };

        try {
        if (!id) {
            await service.create(payload);
        } else {
            const res = await service.get(id);
            await service.sync(id, res.data, payload);
        }
        navigate(`/commandes${type}`);
        } catch (err) {
        console.error(err);
        alert('Erreur lors de l’enregistrement de la commande.');
        }
    };

    const totalCommande = lignes.reduce((s, l) => s + l.total, 0);

    return (
        <div className="container mt-4">
        <h2 className="mb-4">
            {id ? 'Modifier' : 'Nouvelle'} commande {type === 'client' ? 'client' : 'fournisseur'}
        </h2>

        {/* Infos commande */}
        <div className="card p-4 mb-4">
            <div className="row">
            <div className="col-md-4 mb-3">
                <input
                type="text"
                placeholder="Code"
                className="form-control"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                />
            </div>

            <div className="col-md-4 mb-3">
                <input
                type="date"
                className="form-control"
                value={dateCommande}
                onChange={(e) => setDateCommande(e.target.value)}
                />
            </div>

            <div className="col-md-4 mb-3">
                <select
                className="form-select"
                value={partenaireId}
                onChange={(e) => setPartenaireId(e.target.value)}
                >
                <option value="">
                    Sélectionner un {type === 'client' ? 'client' : 'fournisseur'}
                </option>
                {partenaires.map((p) => (
                    <option key={p.id} value={p.id}>
                    {p.nom || p.raisonSociale}
                    </option>
                ))}
                </select>
            </div>
            </div>
        </div>

        {/* Ajout ligne */}
        <div className="card p-4 mb-3">
            <div className="row">
            <div className="col-md-4 mb-2">
                <select className="form-select" value={articleId} onChange={handleArticleChange}>
                <option value="">Sélectionner un article</option>
                {articles.map((a) => (
                    <option key={a.id} value={a.id}>
                    {a.code} - {a.designation}
                    </option>
                ))}
                </select>
            </div>

            <div className="col-md-3 mb-2">
                <input
                type="number"
                placeholder="Quantité"
                className="form-control"
                value={quantite}
                onChange={(e) => setQuantite(e.target.value)}
                />
            </div>

            <div className="col-md-3 mb-2">
                <input
                type="number"
                placeholder="Prix unitaire"
                className="form-control"
                value={prixUnitaire}
                onChange={(e) => setPrixUnitaire(e.target.value)}
                />
            </div>

            <div className="col-md-2">
                <button type="button" className="btn btn-success w-100" onClick={addLine}>
                +
                </button>
            </div>
            </div>
        </div>

        {/* Liste lignes */}
        <div className="card p-3 mb-3" style={{ maxHeight: '220px', overflowY: 'auto' }}>
            <table className="table table-striped mb-0">
            <thead>
                <tr>
                <th>Article</th>
                <th>Qté</th>
                <th>PU</th>
                <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {lignes.map((l, i) => (
                <tr key={i}>
                    <td>{l.articleCode}</td>
                    <td>{l.quantite}</td>
                    <td>{l.prixUnitaire}</td>
                    <td>{l.total}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* Total */}
        <div className="card p-3 text-end fw-bold fs-4 mb-3">Total : {totalCommande}</div>

        {/* Actions */}
        <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-danger me-3" onClick={() => navigate(`/commandes${type}`)}>
            ❌ Annuler
            </button>
            <button className="btn btn-primary" onClick={saveOrUpdate}>
            💾 Enregistrer
            </button>
        </div>
        </div>
    );
};

export default NewCmdCltFrsComponent;
