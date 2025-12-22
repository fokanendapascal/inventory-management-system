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
            { id: '11', titre: "Vue d'ensemble", icon: 'fa-solid fa-chart-pie', url: '/dashboard' },
            { id: '12', titre: 'Statistiques', icon: 'fa-solid fa-chart-column', url: '/statistiques' }
        ],
    },
    {
        id: '2',
        titre: 'Articles',
        icon: 'fa-solid fa-boxes-stacked',
        sousMenu: [
            { id: '21', titre: 'Articles', icon: 'fa-solid fa-boxes-stacked', url: '/articles' },
            { id: '22', titre: 'Mouvements de stock', icon: 'fa-brands fa-stack-overflow', url: '/mvtstock' }
        ],
    },
    {
        id: '3',
        titre: 'Clients',
        icon: 'fa-solid fa-users',
        sousMenu: [
            { id: '31', titre: 'Clients', icon: 'fa-solid fa-users', url: '/clients' },
            { id: '32', titre: 'Commandes clients', icon: 'fa-solid fa-basket-shopping', url: '/commandesclient' }
        ],
    },
    {
        id: '4',
        titre: 'Fournisseurs',
        icon: 'fa-solid fa-users',
        sousMenu: [
            { id: '41', titre: 'Fournisseurs', icon: 'fa-solid fa-users', url: '/fournisseurs' },
            { id: '42', titre: 'Commandes fournisseurs', icon: 'fa-solid fa-truck', url: '/commandesfournisseur' }
        ],
    },
    {
        id: '5',
        titre: 'Paramétrages',
        icon: 'fa-solid fa-gears',
        sousMenu: [
            { id: '51', titre: 'Catégories', icon: 'fa-solid fa-icons', url: '/categories' },
            { id: '52', titre: 'Utilisateurs', icon: 'fa-solid fa-users-gear', url: '/utilisateurs' }
        ],
    }
];

const MenuComponent = () => {
    const [openMenuId, setOpenMenuId] = useState(null);
    const navigate = useNavigate();

    const handleMenuClick = (menu) => {
        const hasSubMenu = menu.sousMenu && menu.sousMenu.length > 0;

        if (hasSubMenu) {
            setOpenMenuId(prev => (prev === menu.id ? null : menu.id));
        } else if (menu.url) {
            navigate(menu.url);
        }
    };

    return (
        <MenuContainer>
            {menuProperties.map(menu => {
                const isExpanded = openMenuId === menu.id;
                const hasSubMenu = menu.sousMenu && menu.sousMenu.length > 0;

                return (
                    <MenuSection key={menu.id}>
                        {/* ----- HEADER MENU ----- */}
                        <MenuHeader onClick={() => handleMenuClick(menu)}>
                            <i className={menu.icon}></i>
                            <MenuTitle>{menu.titre}</MenuTitle>

                            {hasSubMenu && (
                                <ChevronIcon
                                    className={`fa-solid fa-chevron-${isExpanded ? "up" : "down"}`}
                                />
                            )}
                        </MenuHeader>

                        {/* ----- SOUS-MENU (Notez le $isOpen) ----- */}
                        {hasSubMenu && (
                            <SubMenuList $isOpen={isExpanded}>
                                {menu.sousMenu.map(sm => (
                                    <SubMenuItem
                                        key={sm.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(sm.url);
                                        }}
                                    >
                                        <i className={sm.icon}></i>
                                        <span>{sm.titre}</span>
                                    </SubMenuItem>
                                ))}
                            </SubMenuList>
                        )}
                    </MenuSection>
                );
            })}
        </MenuContainer>
    );
};

export default MenuComponent;