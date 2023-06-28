import React, { useState } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import {
  getColorWos,
  getColorsS,
  getColorsUSD,
  getColorsCOP,
  getColorPercentCOP,
  getColorPercentUSD,
  getColorsWhite,
  getColorPercentWhite,
  getColorResoForc,
} from "./colorsFunctions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loading } from "../../../modal/Loading";


// * Valores de la primera columna store

const rowsAsignColor = (column, value) => {

  const definitions = {
    ["P |PM|"]: () => { return getColorsWhite(value) },
    ["P |KAM|"]: () => { return getColorsWhite(value) },
    ["P |Y-1|"]: () => { return getColorsWhite(value) },
    ["S |R+F|"]: () => { return getColorsS(value) },
    ["S |Y-1|"]: () => { return getColorsS(value) },
    ["S |R+F| USD"]: () => { return getColorsUSD(value) },
    ["S |Y-1| USD"]: () => { return getColorsUSD(value) },
    ["USD ∆ VS Y-1"]: () => { return getColorPercentUSD(value) },
    ["S |R+F| COP"]: () => { return getColorsCOP(value) },
    ["S |Y-1| COP"]: () => { return getColorsCOP(value) },
    ["COP ∆ VS Y-1"]: () => { return getColorPercentCOP(value) },
    ["S FCST W-1"]: () => { return getColorsWhite(value) },
    ["AR% FCST W-1"]: () => { return getColorPercentWhite(value) },
    ["SELLABLE INV"]: () => { return getColorsWhite(value) },
    ["DISPLAY INV"]: () => { return getColorsWhite(value) },
    ["WOS-4 |QTY|"]: () => { return getColorWos(value) },
    ["WOS+8 |QTY|"]: () => { return getColorWos(value) },
    ["WOS-4 |AMT|"]: () => { return getColorWos(value) },
    ["WOS+8 |AMT|"]: () => { return getColorWos(value) }
  }
  return !value ? { backgroundColor: "#FFFFFF"}: definitions[column](value)
}

export const TablaColorsCPSI2 = () => {
  // const [ rows, setRows] = useState([])
  const [allDealer, setAllDealer] = useState([])
  const tablaNewCPSI = useSelector((state) => state.bi_wos.table_NewCPSI.data)
  const { dealerTable, calendarDealer } = useSelector((state) => state.bi_wos)
  const [rows, setRows] = useState(tablaNewCPSI)
  const dataDealer = useSelector((state) => state.bi_wos.table_NewCpsiFilterDealer.data)
  const { isLoadingAllDealers, isLoading, titulosFirstTable } = useSelector((state) => state.bi_wos)




  // * Valores de las semanas store
  const weekValues2 = tablaNewCPSI[0]?.Measure ?? []
  // * Valores del forcast o result
  const ResultForcast = tablaNewCPSI[0]?.WEEK_TIPO ?? []

  const CalendarDealer = ({dealer}) => {
    return (
      <>
      {weekValues2.map((week, i) => 
        {
          let style = !!calendarDealer[dealer] ? {
            "whiteSpace": "preLine",
            "background": !!calendarDealer[dealer][week] ? "rgb(198, 239, 206)" : "#FFFADF",
            "fontWeight": !!calendarDealer[dealer][week] ? "bold" : ""
          } : {}
          let plan = !!calendarDealer[dealer] ? calendarDealer[dealer][week]: null

          return(
            <td 
              className="titulosCalenComercial dtfc-fixed-left"
              style={{
                ...style
              }}
              key={i}
            >
              {plan} 
            </td>
          )
        })
      }
      </>
    )
  }


  const TdAddCalendat = ({llave,title}) => {

    const tds = !!rows[llave][title].length ? rows[llave][title] : [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]
    return (
      <>
      {tds.map((val,i) => (
        <td
          key={i}
          style={rowsAsignColor(title, val)}
        >{val}</td>
      ))}
      </>
    )
  }
  const TrCalendarComercial = ({children}) => {
    return children
  }

  useEffect(() => {
    setRows([
      ...tablaNewCPSI,
      ...dataDealer
    ])
  }, [dataDealer])



  useEffect(() => {
  }, [tablaNewCPSI])

  const TitulosFirstTable = ({llave}) => {
    return (titulosFirstTable.map((title, h) => (
      <TrCalendarComercial key={h}>
        {((h % 19) == 0) && (
          <tr 
            key={`calendar_tr_${h}_${title}`} id={`table_cpsi_rows_${llave+1}`}
          >
          <td 
            className="titulosCalenComercial"
            style= {{
              "whiteSpace": "preLine",
              "fontWeight": "bold"
            }}
          >Calendario Comercial</td>
          <td 
            className="titulosCalenComercial"
            style= {{
              "whiteSpace": "preLine",
              
            }}
          > {rows[llave]?.title || 'All Dealer'} </td>
          <CalendarDealer dealer={ rows[llave]?.title || 'ALL'} key={`calendar_${h}`}/>
        </tr>)}
        <tr
          key={`tbody_rows_${llave}_${h}_${title}`}
        > 
          <td className="titulos" key={`tbody_rows_${llave}_td_${h}_${title || 'Sin definir'}`}> {title || 'Sin definir'}</td>
          <td className="titulos" key={`tbody_dealer_titulos_rows_${llave}_td_${h}_${rows[llave]?.title || 'All Dealer'}_`}> {rows[llave]?.title || 'All Dealer'} </td> 

          <TdAddCalendat key={`tr_add_${h}`} llave={llave} title={title}/>
        </tr> 
      </TrCalendarComercial>
    )))
  }

  useEffect(() => {
    setTimeout(() => {
      $('#tbl_cpsi').DataTable({ // eslint-disable-line
        destroy: true,
        rowReorder: false,
        searching: false,
        ordering: false,
        info: false,
        paging: false,
        fixedHeader: false,
        fixedColumns: {
          left: 2
        },
        style: {
          border: '1px solid black' // Establece el estilo del borde de la tabla
        }
      })
    }, 2000)
  }, [rows])

  useEffect(() => {
  }, [isLoadingAllDealers])

  useEffect(() => {
  }, [weekValues2])

  useEffect(() => {
  }, [allDealer])


  return (isLoadingAllDealers) ?
    <div className="table-wrapper">
      <MDBTable
        className="my-table alineacion tamanioLetra"
        bordered
        small
        responsive={false}
        hover
        id='tbl_cpsi'
        // scrollY={true}
        // style={{ height: '900px' }}
      >
        <MDBTableHead>
          <tr>
            <th key="Measure" className="titulos">Measure</th>
            <th key="Dealer" className="titulos">Dealer</th>

            {ResultForcast.map((header, i) => (
              <th key={i*10} style={getColorResoForc(header)} >
                {header}
              </th>
            ))} 
          </tr>
          <tr>
            <th>MEASURE</th>
            <th>Dealer</th>
            {weekValues2.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr> 
        </MDBTableHead>
        <MDBTableBody>
        {Object.keys(rows).map((i) => (
          <TitulosFirstTable llave={i} key={i}/>
        ))}
          

        </MDBTableBody>
      </MDBTable>
    </div> : <Loading />
}
