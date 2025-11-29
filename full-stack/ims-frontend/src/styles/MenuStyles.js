import styled from 'styled-components';

/* Container général du menu */
export const MenuContainer = styled.div`
    width: 100%,
    padding: 10px
`;

/* Chaque section (Bloc menu + sous-menu) */
export const MenuSection = styled.div`
    margin-bottom: 12px;
`;

/* Header du menu principal */
export const MenuHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    background: #f4f6f9;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: #eaecee;
    }

    i {
        font-size: 18px;
        margin-right: 10px;
    }
`;

/* Titre du menu */
export const MenuTitle = styled.span`
    font-weight: 600;
    font-size: 15px;
`;

/* Chevron ouverture/fermeture */
export const ChevronIcon = styled.i`
    margin-left: auto;
    font-size: 13px;
    opacity: 0.6;
`;

/* Sous-menu (animé) */
export const SubMenuList = styled.ul`
    list-style: none;
    padding-left: 0;
    margin: 0;
    margin-top: 5px;
    border-left: 2px solid #dcdcdc;

    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0px")};
    overflow: hidden;
    transition: max-height 0.35s ease-out;
`;

/* Items du sous-menu */
export const SubMenuItem = styled.li`
    padding: 10px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    border-radius: 5px;
    margin: 5px 0;
    background: #fff;
    border: 1px solid transparent;

    &:hover {
        background: #eef2f5;
        border-color: #d0d7dd;
    }

    i {
        font-size: 16px;
    }
`;