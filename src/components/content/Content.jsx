import React from 'react'
import { TituloCpsi } from './titulo'
import { HeaderMenus } from '../Header/Header'
import { Aside } from '../menu/Aside'
import { Footer } from '../footer/Footer'
import { Body } from './Body'


export const Content = ( {children} ) => {
  return (
    <>
    <Body>
      <HeaderMenus/>
      <Aside/>
      <div className="content-wrapper">
      {/* Content Header (Page header) */}
      < TituloCpsi/>
      {/*Se adiciono el siguiente div para cerrar la clase "content-wrapper"
      ya que se comento todo el contenido de la pagina para uso futuro*/}
        <div className="content">
          <div className="container-fluid">
              {children}
          </div>
        </div>
      </div>
      <Footer />
    </Body>
    </>
  )
}
