import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';

const LoginPage = () => {

    // Utilisation d'un état pour gérer un éventuel message de succès si la navigation échoue
    // const [successMessage, setSuccessMessage] = useState('');

    const [authRequest, setAuthRequest] = useState({
        email: '',
        password: ''
    });

    const navigator = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleChange = (e) => {
        const { name, value} = e.target;
        setAuthRequest(prev => ({...prev, [name]: value }) );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Appel de l'API de connexion et capture de la réponse
            const response = await login(authRequest);
            
            // 2. EXTRACTION ET STOCKAGE DU TOKEN (Correction principale ici)
            // Assurez-vous que 'token' correspond à la clé renvoyée par votre backend Spring Boot (peut être 'accessToken' ou autre).
            const token = response.data.token || response.data.accessToken; 

            if (token) {
                // Étape cruciale : stocker le JWT dans le localStorage
                localStorage.setItem('token', token);
                console.log('Connexion réussie. Jeton stocké. Redirection vers la page d\'accueil.');
                
                // Redirection vers la page sécurisée
                navigator('/');
            } else {
                 // Gérer le cas où la connexion réussit mais la réponse est malformée
                 setError('Connexion réussie mais le jeton est manquant dans la réponse API.');
            }

        }catch (err) {
            console.error('Erreur de connection', err); // Utiliser console.error pour les erreurs
            
            // Tenter d'extraire un message d'erreur précis (ex: 401 Unauthorized)
            let errorMessage = 'Une erreur est survenue lors de la connexion.';

            if (err.response && err.response.status === 401) {
                 errorMessage = 'Identifiants invalides. Veuillez vérifier votre email et mot de passe.';
            } else if (err.response && err.response.data && err.response.data.message) {
                 errorMessage = err.response.data.message;
            }
            
            setError(errorMessage);
            
        } finally {
             // S'assurer que le bouton de chargement est désactivé en cas d'erreur ou de succès (sauf si on a navigué)
            setLoading(false);
        }
    }
    
    // Vérification simple si le formulaire peut être soumis
    const isFormValid = authRequest.email && authRequest.password;


    return (
        <div className='container my-container'>
            <div className='card justify-content-md-center'>
                <div className='card-header text-center'>
                    <h3>Se connecter</h3>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>

                        {/* Afficher l'erreur si elle existe */}
                        {error && <div className='alert alert-danger'>{error} </div> }

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={authRequest.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* Password */} 
                        <div className="mb-3">
                            <label className="form-label">Mot de passe</label>
                            <input 
                                type="password"
                                className="form-control"
                                placeholder="Mot de passe"
                                name="password"
                                value={authRequest.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Boutons */}
                        <div className="mb-3 d-flex justify-content-between">
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary"
                                onClick={() => navigator('/inscription')} 
                            >
                                <i className="fa fa-sign-in-alt"></i> S'inscrire
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                // Désactiver si en cours de chargement OU si le formulaire n'est pas rempli
                                disabled={loading || !isFormValid} 
                            >
                                {loading ? 'En cours...' : (
                                    <>
                                        <i className="fa fa-check"></i> Se connecter
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    );
}

export default LoginPage;