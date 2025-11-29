import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MenuContainer,
    MenuSection,
    MenuHeader,
    MenuTitle,
    ChevronIcon,
    SubMenuList,
    SubMenuItem,
} from "../styles/MenuStyles";

const menuProperties = [
    {
        id: '1',
        titre: 'Tableau de bord',
        icon: 'fa-solid fa-chart-line',
        sousMenu: [
            { id: '11', titre: "Vue d'ensemble", icon: 'fa-solid fa-chart-pie', url: '' },
            { id: '12', titre: 'Statistiques', icon: 'fa-solid fa-chart-column', url: 'statistiques' }
        ],
    },
    {
        id: '2',
        titre: 'Articles',
        icon: 'fa-solid fa-boxes-stacked',
        sousMenu: [
            { id: '21', titre: 'Articles', icon: 'fa-solid fa-boxes-stacked', url: 'articles' },
            { id: '22', titre: 'Mouvements de stock', icon: 'fa-brands fa-stack-overflow', url: 'mvtstock' }
        ],
    },
    {
        id: '3',
        titre: 'Clients',
        icon: 'fa-solid fa-users',
        sousMenu: [
            { id: '31', titre: 'Clients', icon: 'fa-solid fa-users', url: 'clients' },
            { id: '32', titre: 'Commandes clients', icon: 'fa-solid fa-basket-shopping', url: 'commandesclient' }
        ],
    },
    {
        id: '4',
        titre: 'Fournisseurs',
        icon: 'fa-solid fa-users',
        sousMenu: [
            { id: '41', titre: 'Fournisseurs', icon: 'fa-solid fa-users', url: 'fournisseurs' },
            { id: '42', titre: 'Commandes fournisseurs', icon: 'fa-solid fa-truck', url: 'commandesfournisseur' }
        ],
    },
    {
        id: '5',
        titre: 'Parametrages',
        icon: 'fa-solid fa-gears',
        sousMenu: [
            { id: '51', titre: 'Categories', icon: 'fa-solid fa-icons', url: 'categories' },
            { id: '52', titre: 'Utilisateurs', icon: 'fa-solid fa-users-gear', url: 'utilisateurs' }
        ],
    }
];

const MenuComponent = () => {

    const [openMenuId, setOpenMenuId] = useState(null);
    const navigate = useNavigate();

    const toggleMenu = (id) => {
        setOpenMenuId(prev => (prev === id ? null : id));
    };

    return (
        <MenuContainer>

            {menuProperties.map(menu => (
                <MenuSection key={menu.id}>
                    
                    {/* ----- HEADER MENU ----- */}
                    <MenuHeader onClick={() => toggleMenu(menu.id)}>
                        <i className={menu.icon}></i>
                        <MenuTitle>{menu.titre}</MenuTitle>

                        <ChevronIcon
                            className={`fa-solid fa-chevron-${openMenuId === menu.id ? "up" : "down"}`}
                        />
                    </MenuHeader>

                    {/* ----- SOUS-MENU ----- */}
                    <SubMenuList isOpen={openMenuId === menu.id}>
                        {menu.sousMenu.map(sm => (
                            <SubMenuItem
                                key={sm.id}
                                onClick={() => navigate(sm.url)}
                            >
                                <i className={sm.icon}></i>
                                <span>{sm.titre}</span>
                            </SubMenuItem>
                        ))}
                    </SubMenuList>

                </MenuSection>
            ))}

        </MenuContainer>
    );
};

export default MenuComponent;
