import React from 'react'
import { FooterWrapper } from '../styles/FooterStyles'

const FooterComponent = () => {
  return (
    
    <FooterWrapper >
            © {new Date().getFullYear()} Gestion de Stock — Tous droits réservés.
    </FooterWrapper>
    
  )
}

export default FooterComponent