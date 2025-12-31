import React, { useState, useEffect } from "react";
import {
    HeaderContainer,
    LeftBlock,
    SearchGroup,
    RightBlock,
    UserInfo,
    Avatar
} from "../styles/HeaderStyles";
import { getCurrentUser, getUserByEmail } from "../services/UtilisateurService";

export default function HeaderComponent() {
    const [searchValue, setSearchValue] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Récupérer l'utilisateur connecté au montage du composant
    useEffect(() => {
        getCurrentUser()
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du profil :", error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => setSearchValue(e.target.value);

    // 2. Logique de recherche (Utilisation de getUserByEmail au lieu de getCurrentUser)
    const handleSearch = () => {
        if (!searchValue.trim()) return;
        
        getUserByEmail(searchValue)
            .then(response => {
                console.log("Utilisateur trouvé :", response.data);
                // Logique suite à la recherche (ex: redirection ou affichage)
            })
            .catch(error => console.error("Recherche infructueuse :", error));
    };

    const getInitials = (userData) => {
        if (userData?.prenom) return userData.prenom.charAt(0).toUpperCase();
        if (userData?.nom) return userData.nom.charAt(0).toUpperCase();
        return "?";
    };

    if (loading) return null; // Ou un spinner léger

    return (
        <HeaderContainer>
            {/* Barre de recherche */}
            <LeftBlock>
                <SearchGroup>
                    <input
                        type="text"
                        placeholder="Rechercher par email..."
                        className='form-control'
                        value={searchValue}
                        onChange={handleChange}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <span onClick={handleSearch} style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                </SearchGroup>
            </LeftBlock>

            {/* Côté droit : Infos utilisateur */}
            <RightBlock>
                <UserInfo>
                    <span>
                        Bonjour, <strong>{user?.prenom || user?.nom || 'Utilisateur'}</strong>
                    </span>
                </UserInfo>
                <Avatar title={user?.prenom || 'User'}>
                    {getInitials(user)}
                </Avatar>
            </RightBlock>
        </HeaderContainer>
    );
}