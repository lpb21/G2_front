import React from 'react'
import { TabsBootstrap } from '../tabs';
import { AccordeonFilters } from '../tablas/Layouts/accordeon/accordeon';

export const ChannelPSI = () => {

  return (
    <>
      
      {/* Sección de filtros */}
      <AccordeonFilters />
      {/* Separador */}
      {/* <hr /> */}
      {/* Sección de pestañas */}
      < TabsBootstrap />
    </>
  )
}
