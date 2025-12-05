import React, {useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../services/ArticleService";

import {
    getStockReelArticle,
    listMvtStocks,
    createEntreeStock,
    createSortieStock,
    createCorrectionStockPos,
    createCorrectionStockNeg
} from "../services/MvtStockService";

// Utils
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return dateString;
    }
};

const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price || 0);
};

const MvtStockPage = () => {
    const { articleId } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [article, setArticle] = useState({
        photo: "",
        codeArticle: "",
        designation: "",
        prixUnitaireHt: 0,
        prixUnitaireTtc: 0,
        stockActuel: 0,
    });

    const [mvtStocks, setMvtStocks] = useState([]);

    // Actions
    const [showActions, setShowActions] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ===========================
    // 🔄 RELOAD DATA
    // ===========================
    const reloadData = useCallback(async () => {
        if (!articleId) return;

        setIsLoading(true);
        setError(null);

        try {
            const [articleResp, stockResp, mvtResp] = await Promise.all([
                getArticle(articleId),
                getStockReelArticle(articleId),
                listMvtStocks(articleId),
            ]);

            setArticle({
                ...articleResp.data,
                stockActuel: stockResp.data || 0,
            });

            setMvtStocks(Array.isArray(mvtResp.data) ? mvtResp.data : []);
        } catch (err) {
            console.error(err);
            setError("Impossible de charger les données de l'article ou de stock.");
        } finally {
            setIsLoading(false);
        }
    }, [articleId]); 


    // ===========================
    // 🎣 USE EFFECT
    // ===========================
    useEffect(() => {
        reloadData();
    }, [reloadData]);

    // ===========================
    // 🎛 HANDLING ACTIONS
    // ===========================
    const openAction = (action) => {
        setCurrentAction(action);
        setQuantity("");
        setShowActions(false);
    };

    const closeModal = () => {
        setCurrentAction(null);
        setQuantity("");
    };

    const currentActionLabel = () => {
        switch (currentAction) {
            case "ENTREE": return "Entrée de stock";
            case "SORTIE": return "Sortie de stock";
            case "CORR_POS": return "Correction positive";
            case "CORR_NEG": return "Correction négative";
            default: return "";
        }
    };

    const handleSubmitStockAction = async () => {
        const numQuantity = Number(quantity);

        if (!numQuantity || numQuantity <= 0 || !Number.isFinite(numQuantity)) {
            alert("Veuillez entrer une quantité numérique positive et valide.");
            return;
        }

        const payload = {
            quantite: numQuantity,
            idArticle: articleId,
            sourceMvt: "COMMANDE_CLIENT"
        };

        setIsSubmitting(true);

        try {
            switch (currentAction) {
                case "ENTREE":
                    await createEntreeStock(payload);
                    break;
                case "SORTIE":
                    await createSortieStock(payload);
                    break;
                case "CORR_POS":
                    await createCorrectionStockPos(payload);
                    break;
                case "CORR_NEG":
                    await createCorrectionStockNeg(payload);
                    break;
                default:
                    return;
            }

            closeModal();
            await reloadData();

        } catch (e) {
            console.error("Erreur lors de l'opération de stock:", e);
            const apiMessage = e.response?.data?.message || "Erreur inconnue lors de l'opération de stock.";
            alert(apiMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ===========================
    // ⏳ LOADING & ERROR
    // ===========================
    if (isLoading) {
        return <div className="container text-center py-10">Chargement…</div>;
    }

    if (error) {
        return (
            <div className="container text-center py-10">
                <p className="text-xl text-red-600 font-semibold">Erreur : {error}</p>
            </div>
        );
    }

    // ===========================
    // 🎨 RENDER UI
    // ===========================
    return (
        <div className="container mx-auto px-4">

            <h1 className="text-3xl font-bold mb-6">Mouvements de stock</h1>

            {/* ===============================
                SECTION ARTICLE
            ================================ */}
            <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
                <div className="flex flex-wrap items-center -mx-3">

                    <div className="w-full md:w-1/4 px-3">
                        <img
                            src={article.photo || "/placeholder.png"}
                            alt={article.designation}
                            className="w-28 h-28 object-cover rounded border"
                        />
                    </div>

                    <div className="w-full md:w-1/4 px-3">
                        <p><strong>📘 Code article :</strong></p>
                        <p>{article.codeArticle}</p>

                        <p className="mt-2"><strong>📝 Désignation :</strong></p>
                        <p>{article.designation}</p>

                        <p className="mt-2"><strong>💲 Prix HT :</strong></p>
                        <p>{formatPrice(article.prixUnitaireHt)} FCFA</p>

                        <p className="mt-2"><strong>💲 Prix TTC :</strong></p>
                        <p>{formatPrice(article.prixUnitaireTtc)} FCFA</p>
                    </div>

                    <div className="w-full md:w-1/4 px-3 text-center">
                        <p className="font-semibold text-lg">📦 Stock actuel</p>
                        <p className="text-3xl font-bold mt-2">{article.stockActuel}</p>
                    </div>

                    <div className="w-full md:w-1/4 px-3 text-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setShowActions(!showActions)}
                        >
                            Correction de stock
                        </button>

                        {showActions && (
                            <div className="mt-3 bg-white border shadow-lg rounded p-3 space-y-2">
                                <button className="btn-action" onClick={() => openAction("ENTREE")}>➕ Entrée</button>
                                <button className="btn-action" onClick={() => openAction("SORTIE")}>➖ Sortie</button>
                                <button className="btn-action" onClick={() => openAction("CORR_POS")}>🟩 Correction +</button>
                                <button className="btn-action" onClick={() => openAction("CORR_NEG")}>🟥 Correction -</button>
                                <button className="text-red-600 font-semibold" onClick={() => setShowActions(false)}>
                                    Fermer
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* ===============================
                TABLE HISTORIQUE
            ================================ */}
            <h2 className="text-2xl font-semibold mb-4">Historique des mouvements</h2>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="grid grid-cols-4 bg-gray-100 font-bold px-4 py-3 border-b">
                    <span>Date</span>
                    <span className="text-center">Quantité</span>
                    <span className="text-center">Type</span>
                    <span className="text-center">Source</span>
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                    {mvtStocks.length === 0 ? (
                        <p className="p-4 text-center text-gray-500">Aucun mouvement.</p>
                    ) : (
                        mvtStocks.map((mvt, idx) => (
                            <div key={mvt.id || idx} className="grid grid-cols-4 px-4 py-3 border-b hover:bg-gray-50">
                                <span>{formatDate(mvt.dateMvt)}</span>
                                <span className={`text-center font-medium ${mvt.typeMvt === "SORTIE" || mvt.typeMvt === "CORRECTION_NEGATIVE" ? "text-red-600" : "text-green-600"}`}>
                                    {mvt.quantite}
                                </span>
                                <span className="text-center">{mvt.typeMvt}</span>
                                <span className="text-center">{mvt.sourceMvt}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ===============================
                MODAL ACTION
            ================================ */}
            {currentAction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-xl w-80">
                        <h3 className="text-xl font-semibold mb-4">{currentActionLabel()}</h3>

                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="border w-full p-2 rounded mb-4 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Quantité"
                            disabled={isSubmitting} // 💡 Désactiver la saisie pendant l'envoi
                        />

                        <div className="flex justify-between">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                                onClick={closeModal}
                                disabled={isSubmitting} // 💡 Désactiver l'annulation
                            >
                                Annuler
                            </button>

                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
                                onClick={handleSubmitStockAction}
                                disabled={isSubmitting} // 💡 Désactiver la validation pendant l'envoi
                            >
                                {isSubmitting ? "Envoi..." : "Valider"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default MvtStockPage;
