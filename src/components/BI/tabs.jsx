import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from "react-bootstrap";
import { GraficosCombinados } from "./generalCharts.jsx";
import { TablaMeasureGral2 } from "./tablas/Layouts/tablaColorsMeasure2.jsx";
import { TablaColorsCPSI2 } from "./tablas/Layouts/tablaColorsCPSI2.jsx";
import { Loading } from "../modal/Loading.jsx";

export const TabsBootstrap = () => {
  // *Evento para controlar el despliegue Y colapso de las pestañas
  const [pestania, setpestania] = useState(1)
  const { isLoading } = useSelector(state => state.bi_wos)
  const eventSelect = (tab) => {
    setpestania(tab)
  }
 
  
  useEffect(() => {
    setTimeout(() => {
      // Asignamos DataTable
      $('#tbl_measure').DataTable({  // eslint-disable-line
        destroy: true,
        rowReorder: false,
        searching: false,
        ordering: false,
        info: false,
        paging: false,
        fixedHeader: true,
        fixedColumns:   {
            left: 1,
            className: 'color-fixed'
        },
        borders: true
      })

     
    }, 2000)
  
  }, [])

  useEffect(() => {
  }, [isLoading])

  return ( isLoading ? 
    <Tabs
      defaultActiveKey="home"
      id="my-tabs"
      activeKey={pestania}
      onSelect={eventSelect}
    >
      <Tab
        eventKey="1"
        title="Grafico Integrado"
        unmountOnExit={true}
        style={{ backgroundColor: "#f9f4f6" }}
      >
        <>
          <GraficosCombinados />
          <TablaMeasureGral2 />         
        </>
      </Tab>
      <Tab
        eventKey="2"
        title="Cpsi"
        unmountOnExit={true}
        style={{ backgroundColor: "#f9f4f6" }}
        >
          <TablaColorsCPSI2/>
        
      </Tab>
    </Tabs>
    : <Loading/> )
}
