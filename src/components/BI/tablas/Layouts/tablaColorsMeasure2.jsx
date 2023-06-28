import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import {
  getColor,
  getColor2WosMeasure,
  getColorWhite,
  getColorResoForc,
} from "./colorsFunctions"
import { memo } from "react";

export const TablaMeasureGral2 = memo(() => {
  const [rows , setRows] = useState(
    [
      {
        data: [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        data: [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        data: [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        data: [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        data: [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        data: [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        data: [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        data: [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        data: [],
        getColor: (value) => getColor2WosMeasure(value),
      }
    ]
  )
  const tablaMeasureGral2 = useSelector(
    (state) => state.bi_wos.table_NewMeasure.data
  );

  // * Valores de las semanas store
  const weekValues2 = tablaMeasureGral2[0]?.Measure ?? [];

  // * Valores de la primera columna store
  const titulosFirstColumn = tablaMeasureGral2?.length
    ? Object.keys(tablaMeasureGral2[0]).filter(
        (key) => key !== "Measure" && key !== "WEEK_TIPO"
      )
    : [];

  // * Valores del forcast o result
  const ResultForcast = tablaMeasureGral2[0]?.WEEK_TIPO ?? [];

  
  

  useEffect(() => {
    setRows([
      {
        //label: "P |PM|",
        //data: tablaMeasureGral2[0] && tablaMeasureGral2[0]["P |PM|"] ? tablaMeasureGral2[0]["P |PM|"] : [],
        data: tablaMeasureGral2[0]?.["WOS-4 |Y-1|"] ?? [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        //label: "P |Y-1|",
        //data: tablaMeasureGral2[0] && tablaMeasureGral2[0]["P |Y-1|"] ? tablaMeasureGral2[0]["P |Y-1|"] : [],
        data: tablaMeasureGral2[0]?.["WOS+8 |Y-1|"] ?? [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        //label: "P |KAM|",
        //data: tablaMeasureGral2[0] && tablaMeasureGral2[0]["P |KAM|"] ? tablaMeasureGral2[0]["P |KAM|"] : [],
        data: tablaMeasureGral2[0]?.["WOS-4"] ?? [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        //label: "S |R+F|",
        data: tablaMeasureGral2[0]?.["WOS+8"] ?? [],
        getColor: (value) => getColor2WosMeasure(value),
      },
      {
        //label: "S |Y-1|",
        data: tablaMeasureGral2[0]?.["FLOORING |Y-1|"] ?? [],
        getColor: (value) => getColorWhite(value),
      },
      {
        //label: "S|Y-1|USD|",
        data: tablaMeasureGral2[0]?.["WRR |Y-1|"] ?? [],
        getColor: (value) => getColorWhite(value),
      },
      {
        //label: "S|R+F|USD|",
        data: tablaMeasureGral2[0]?.["FLOORING |R+F|"] ?? [],
        getColor: (value) => getColorWhite(value),
      },
      {
        //label: "USD ∆ Vs Y-1",
        data: tablaMeasureGral2[0]?.["WRR |R+F|"] ?? [],
        getColor: (value) => getColorWhite(value),
      },
      {
        //label: "S|R+F|COP|",
        data: tablaMeasureGral2[0]?.["A/R% |FCST W-1|"] ?? [],
        getColor: (value) => getColor(value)
      },
    ])

    // if (!!tablaMeasureGral2.length) {
      
  },[tablaMeasureGral2])

  useEffect(() => {
   
  },[rows])

  
  useEffect(() => {
    
  },[])

  

  return (
    <div className="table-wrapper">
      <MDBTable
        className="my-table alineacion tamanioLetra"
        bordered
        small
        responsive={false}
        hover
        id='tbl_measure'
      >
        <MDBTableHead>
          <tr>
            <th className="titulos">WEEK_TIPO</th>
            {ResultForcast.map((header, i) => (
              <th  key={i} style={getColorResoForc(header)}>
                {header}
              </th>
            ))}
          </tr>
          {/* <tr>
             <th>MEASURE</th>
            {weekValues2.map((header, i) => (
              <th key={i}>{header}</th>
            ))} 
          </tr> */}
        </MDBTableHead>
        <MDBTableBody>
          {rows.map((row, i) => (
            <tr key={i}>
              {/* //* Renderizado de la primera columna */}
              {/* <td className="sticky-left">{row.label}</td> */}
              <td className="titulos">{titulosFirstColumn[i]}</td>
              {row.data.map((value, j) => (
                <td key={j} style={row.getColor(value)}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  )
})
