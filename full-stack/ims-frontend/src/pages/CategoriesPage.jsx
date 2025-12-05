import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCategory, listCategories } from '../services/CategoryService';

const CategoriesPage = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigator = useNavigate();

    const getAllCategories = () => {

        setLoading(true);

        listCategories()
            .then(response => {
                setCategories(response.data || []);
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
                setError('Impossible de charger les categories');
                setLoading(false);
            });
            
    };

    useEffect(() => {
        const fetchCat = async () => {
            await getAllCategories();
        }
        fetchCat();
    }, []);

    const addNewCategory = () => navigator('/add-category');

    const updateCat = (id) => navigator(`/edit-category/${id}`);

    const removeCategory = (id) => {
        if (window.confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
            deleteCategory(id)
                .then(() => {
                    getAllCategories();   // 🔥 rafraîchir la liste
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <div className='container'>
            <div className='d-flex justify-content-between my-3'>
                <h2 className='text-center'>Liste des catégories</h2>
                <br />
                <button type='button' className='btn btn-primary mb-3' onClick={addNewCategory}>
                    + Nouvelle catégorie
                </button>
            </div>
            
            {loading && (
                <p className="text-center">Chargement des catégories...</p>
            )}

            {error && (
                <p className="text-danger text-center">{error}</p>
            )}

            {!loading && categories.length === 0 && (
                <div className="alert alert-info text-center">
                    Aucune catégorie disponible.
                </div>
            )}

            {!loading && categories.length > 0 && (
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Désignation</th>
                            <th>ID Entreprise</th>
                            <th style={{ width: "150px" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.code}</td>
                                <td>{cat.designation}</td>
                                <td>{cat.idEntreprise}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => updateCat(cat.id)}
                                    >
                                        Modifier
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeCategory(cat.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
};

export default CategoriesPage;
