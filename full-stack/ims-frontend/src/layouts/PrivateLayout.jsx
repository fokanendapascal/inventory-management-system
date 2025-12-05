import React from "react";
import { Outlet } from "react-router-dom";
import MenuComponent from "../components/MenuComponent";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

import {
    MainContainer,
    LayoutWrapper,
    Sidebar,
    ContentColumn,
    HeaderWrapper,
    FooterWrapper,
    DynamicContent
} from "../styles/DashboardStyles";

export default function PrivateLayout() {
  return (
    <MainContainer>
      <LayoutWrapper>

        {/* --- SIDEBAR --- */}
        <Sidebar>
            <div style={{ marginBottom: "20px" }}>
                <h4>Gestion de stock v2.0</h4>
                <small>By Pascal Foka Nenda</small>
            </div>

            <MenuComponent />
        </Sidebar>

        {/* --- MAIN COLUMN --- */}
        <ContentColumn>

            {/* Header */}
            <HeaderWrapper>
                <HeaderComponent />
            </HeaderWrapper>

            {/* Content */}
            <DynamicContent>
                <Outlet />
            </DynamicContent>

            {/* Footer */}
            <FooterWrapper>
                <FooterComponent />
            </FooterWrapper>

        </ContentColumn>

      </LayoutWrapper>
    </MainContainer>
  );
}


