import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteArticle, listArticles } from '../services/ArticleService';

const ArticlesPage = () => {

    const [articles, setArticles] = useState([]);

    const navigator = useNavigate();

    const getAllArticles = () => {
        listArticles()
        .then((response) => {
            setArticles(response.data);
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        getAllArticles();
    }, [])
    
    const addNewArticle = () => navigator('/add-article');

    const updateArticle = (id) => navigator(`/edit-article/${id}`);

    const removeArticle = (id) => {
        if(window.confirm('Voulez-vous vraiment supprimer cet article?')) {
            deleteArticle(id)
            .then(() => {
               getAllArticles();
            })
            .catch((error) => console.error(error));
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Liste des articles</h2>
            <br />

            <button className="btn btn-primary mb-3" onClick={addNewArticle}>
                
                + Nouveau
            </button>

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Code Article</th>
                        <th>Désignation</th>
                        <th>Prix Unitaire HT</th>
                        <th>Taux TVA</th>
                        <th>Prix Unitaire TTC</th>
                        <th>Photo</th>
                        <th>Catégorie</th>
                        <th>Entreprise</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {articles.length === 0 ? (
                        <tr>
                            <td colSpan={10} className="text-center">
                                Aucun article disponible
                            </td>
                        </tr>
                    ) : (
                        articles.map((article) => (
                            <tr key={article.id}>
                                <td>{article.id}</td>
                                <td>{article.codeArticle}</td>
                                <td>{article.designation}</td>
                                <td>{article.prixUnitaireHt}</td>
                                <td>{article.tauxTva}</td>
                                <td>{article.prixUnitaireTtc}</td>
                                <td>{article.photo || '-'}</td>
                                <td>{article.category?.nom || '-'}</td>
                                <td>{article.idEntreprise?.nom || '-'}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => updateArticle(article.id)}
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeArticle(article.id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

}

export default ArticlesPage