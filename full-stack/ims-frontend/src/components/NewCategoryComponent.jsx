import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCategory, getCategory, updateCategory } from '../services/CategoryService';

const NewCategoryComponent = () => {

    const [category, setCategory] = useState({
        code: '',
        designation: '',
        idEntreprise: ''
    });

    const [errors, setErrors] = useState({});
    const { id } = useParams(); // si id existe ⇒ mode édition
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getCategory(id)
                .then(res => setCategory(res.data))
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const validateForm = () => {
        let errs = {};
        if (!category.code) errs.code = "Le code est obligatoire";
        if (!category.designation) errs.designation = "La désignation est obligatoire";
        if (!category.idEntreprise) errs.idEntreprise = "idEntreprise obligatoire";

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = {
            code: category.code,
            designation: category.designation,
            idEntreprise: category.idEntreprise
        };

        if (id) {
            // mode update
            updateCategory(id, payload)           
                .then((response) => {
                    console.log('Categorie mis à jour : ', response.data);
                    navigator("/categories");
                }) 
                .catch(error => console.error(error));
        } else {
            // mode create
            createCategory(payload)
                .then((response) => {
                    console.log('Catégorie créée :', response.data)
                    navigator("/categories")
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="container col-md-6 mt-4">
            <div className="card p-4 shadow">
                <h3 className="text-center mb-3">
                    {id ? "Modifier une catégorie" : "Créer une catégorie"}
                </h3>

                <form onSubmit={handleSubmit}>
                    {/* Code */}
                    <div className="form-group mb-3">
                        <label>Code</label>
                        <input
                            type="text"
                            name="code"
                            className={`form-control ${errors.code ? "is-invalid" : ""}`}
                            value={category.code}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.code}</div>
                    </div>

                    {/* Designation */}
                    <div className="form-group mb-3">
                        <label>Désignation</label>
                        <input
                            type="text"
                            name="designation"
                            className={`form-control ${errors.designation ? "is-invalid" : ""}`}
                            value={category.designation}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.designation}</div>
                    </div>

                    {/* ID Entreprise */}
                    <div className="form-group mb-3">
                        <label>ID Entreprise</label>
                        <input
                            type="number"
                            name="idEntreprise"
                            className={`form-control ${errors.idEntreprise ? "is-invalid" : ""}`}
                            value={category.idEntreprise}
                            onChange={handleChange}
                        />
                        <div className="invalid-feedback">{errors.idEntreprise}</div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-secondary" onClick={() => navigator("/categories")}>
                            Annuler
                        </button>

                        <button className="btn btn-primary" type="submit">
                            {id ? "Mettre à jour" : "Créer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewCategoryComponent;
