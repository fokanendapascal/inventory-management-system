import React, { useEffect, useState, useMemo } from 'react';
import securedAxiosInstance from '../services/AxiosInstance';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const StatistiquesPage = () => {
    const [rawData, setRawData] = useState({
        articles: [],
        categories: [],
        clients: [],
        cmdsClts: [],
        cmdsFrs: [],
        fournisseurs: [],
        users: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const fetchData = async () => {
        try {
            const apiConfig = [
                { key: 'articles', url: '/articles/all' },
                { key: 'categories', url: '/category/all' },
                { key: 'clients', url: '/clients/all' },
                { key: 'cmdsClts', url: '/commandesclients/all' },
                { key: 'cmdsFrs', url: '/commandesfournisseurs/all' },
                { key: 'fournisseurs', url: '/fournisseurs/all' },
                { key: 'users', url: '/utilisateurs/all' }
            ];

            const responses = await Promise.all(
            apiConfig.map(item =>
                securedAxiosInstance.get(item.url, {
                signal: controller.signal
                })
            )
            );

            if (!isMounted) return;

            const formattedData = {};
            apiConfig.forEach((item, index) => {
            formattedData[item.key] = responses[index].data ?? [];
            });

            setRawData(formattedData);

        } catch (err) {
            if (err.name !== 'CanceledError') {
            console.error('Erreur StatistiquesPage:', err);
            setError(
                err.response?.data?.message ||
                err.message ||
                'Erreur de chargement des statistiques'
            );
            }
        } finally {
            isMounted && setLoading(false);
        }
        };

        fetchData();

        return () => {
        isMounted = false;
        controller.abort();
        };
    }, []);

    const statsData = useMemo(() => [
        { name: 'Articles', value: rawData.articles.length, color: '#8884d8' },
        { name: 'Catégories', value: rawData.categories.length, color: '#82ca9d' },
        { name: 'Clients', value: rawData.clients.length, color: '#ffc658' },
        { name: 'Cmd Clients', value: rawData.cmdsClts.length, color: '#ff8042' },
        { name: 'Cmd Frs', value: rawData.cmdsFrs.length, color: '#0088FE' },
        { name: 'Fournisseurs', value: rawData.fournisseurs.length, color: '#00C49F' },
        { name: 'Utilisateurs', value: rawData.users.length, color: '#FFBB28' }
    ], [rawData]);

    if (loading) {
        return <div className="p-6 text-center">Chargement des statistiques...</div>;
    }

    if (error) {
        return (
        <div className="p-6 text-red-600 bg-red-50 border border-red-200 m-4 rounded">
            Erreur : {error}
        </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-8 text-gray-800">
                Tableau de Bord
            </h1>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={statsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {statsData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                            ))}
                        </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StatistiquesPage;
