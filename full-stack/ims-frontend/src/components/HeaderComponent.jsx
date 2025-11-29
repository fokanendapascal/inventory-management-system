import React from "react";
import {
    HeaderContainer,
    LeftBlock,
    SearchGroup,
    RightBlock,
    UserInfo,
    Avatar
} from "../styles/HeaderStyles";

export default function HeaderComponent() {
    return (
        <HeaderContainer>

        {/* Search bar */}
        <LeftBlock>
            <SearchGroup>
            <input 
                type="text" 
                placeholder="Rechercher…" 
            />
            <span>
                <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            </SearchGroup>
        </LeftBlock>

        {/* Right side */}
        <RightBlock>
            <UserInfo>Bonjour</UserInfo>
            <Avatar />
        </RightBlock>

        </HeaderContainer>
    );
}

