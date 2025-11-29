import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteFournisseur, listFournisseurs } from '../services/FournisseurService';

const ListFournisseursPage = () => {

    const [fournisseurs, setFournisseurs] = useState([]);

    const navigator = useNavigate();

    function getAllFournisseurs(){
        listFournisseurs().then((response) => {
            setFournisseurs(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    useEffect(() => {
        getAllFournisseurs();
    }, [])

    const addNewFournisseur = ()=> navigator('/add-fournisseur');

    const updateFournisseur = (id) => navigator(`/edit-fournisseur/${id}`);
    
    const removeFournisseur = (id) => {
        if(window.confirm('Voulez-vous vraiment supprimer ce fournisseur')){
            deleteFournisseur(id)
            .then(() => {
                getAllFournisseurs(); //Rafraichir la liste après la suppression
            })
            .catch((error) => console.error(error));
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Liste des fournisseurs</h2>
            <br />
            <button className="btn btn-primary mb-3" onClick={addNewFournisseur}>
            + Nouveau
            </button>

            <table className="table table-striped table-bordered">
            <thead>
                <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Adresse 1</th>
                <th>Adresse 2</th>
                <th>Ville</th>
                <th>Code Postal</th>
                <th>Pays</th>
                <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {fournisseurs.map((fournisseur) => (
                <tr key={fournisseur.id}>
                    <td>{fournisseur.id}</td>
                    <td>{fournisseur.nom}</td>
                    <td>{fournisseur.prenom}</td>
                    <td>{fournisseur.mail}</td>
                    <td>{fournisseur.numTel}</td>
                    <td>{fournisseur.adresse.adresse1}</td>
                    <td>{fournisseur.adresse.adresse2}</td>
                    <td>{fournisseur.adresse.ville}</td>
                    <td>{fournisseur.adresse.codePostal}</td>
                    <td>{fournisseur.adresse.pays}</td>
                    <td>
                    <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => updateFournisseur(fournisseur.id)}
                    >
                        Modifier
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeFournisseur(fournisseur.id)}
                    >
                        Supprimer
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}

export default ListFournisseursPage