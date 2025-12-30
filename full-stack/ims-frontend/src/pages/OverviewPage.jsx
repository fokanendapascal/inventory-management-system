import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import securedAxiosInstance from '../services/AxiosInstance';
import {
    Package,
    Layers,
    Users,
    ShoppingCart,
    Truck,
    UserCog,
    TrendingUp,
    BarChart3
} from 'lucide-react';

const OverviewPage = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        articles: 0,
        categories: 0,
        clients: 0,
        cmdsClients: 0,
        cmdsFournisseurs: 0,
        utilisateurs: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const endpoints = [
                    '/articles/all',
                    '/category/all',
                    '/clients/all',
                    '/commandesclients/all',
                    '/commandesfournisseurs/all',
                    '/utilisateurs/all'
                ];

                // Utilisation de allSettled pour ne pas bloquer toute la page si une route échoue
                const results = await Promise.allSettled(
                    endpoints.map(url => securedAxiosInstance.get(url))
                );

                const getCount = (index) => 
                    results[index].status === 'fulfilled' ? (results[index].value.data?.length || 0) : 0;

                setStats({
                    articles: getCount(0),
                    categories: getCount(1),
                    clients: getCount(2),
                    cmdsClients: getCount(3),
                    cmdsFournisseurs: getCount(4),
                    utilisateurs: getCount(5)
                });
            } catch (err) {
                console.error('Erreur OverviewPage:', err);
                setError('Une erreur est survenue lors de la récupération des données.');
            } finally {
                setLoading(false);
            }
        };

        fetchOverview();
    }, []);

    if (loading) return <div className="p-8 text-center text-gray-500 font-medium">Chargement de la vue d’ensemble...</div>;

    const cards = [
        { label: 'Articles', value: stats.articles, icon: Package, color: 'bg-indigo-500', path: '/articles' },
        { label: 'Catégories', value: stats.categories, icon: Layers, color: 'bg-green-500', path: '/categories' },
        { label: 'Clients', value: stats.clients, icon: Users, color: 'bg-yellow-500', path: '/clients' },
        { label: 'Commandes Clients', value: stats.cmdsClients, icon: ShoppingCart, color: 'bg-orange-500', path: '/commandesclient' },
        { label: 'Commandes Fournisseurs', value: stats.cmdsFournisseurs, icon: Truck, color: 'bg-blue-500', path: '/commandesfournisseur' },
        { label: 'Utilisateurs', value: stats.utilisateurs, icon: UserCog, color: 'bg-purple-500', path: '/utilisateurs' },
        { label: 'Statistiques', value: null, icon: BarChart3, color: 'bg-emerald-500', path: '/statistiques' },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-indigo-600" />
                    Tableau de bord
                </h1>
                <p className="text-gray-500 mt-2">Bienvenue ! Voici un résumé de votre activité.</p>
            </header>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            onClick={() => navigate(card.path)}
                            className="
                                group cursor-pointer bg-white rounded-2xl shadow-sm border border-gray-100 p-6
                                flex flex-col justify-between min-h-[140px]
                                transition-all duration-300
                                hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100
                                focus:outline-none focus:ring-2 focus:ring-indigo-500
                            "
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && navigate(card.path)}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{card.label}</p>
                                    {card.value !== null ? (
                                        <p className="text-4xl font-black text-gray-800 mt-2 tracking-tight">
                                            {card.value}
                                        </p>
                                    ) : (
                                        <p className="text-sm font-medium text-indigo-600 mt-4 group-hover:underline">Consulter →</p>
                                    )}
                                </div>
                                <div className={`p-3 rounded-xl text-white shadow-lg ${card.color} transform transition-transform group-hover:rotate-12`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OverviewPage;