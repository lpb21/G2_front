import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
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
  } from "./colorsFunctions"
import { useSelector } from "react-redux"

export const TableHorizontalCpsiDealer = () => {
  const {data} = useSelector(
    (state) => state.bi_wos.table_NewCpsiFilterDealer
  )

  let rows = [];

  // Recorrer cada objeto del store en data
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const store = data[key];

      // * Se Crea un objeto para cada medida

      const totalPM = {
        key,
        data: store["P |PM|"],
        getColor: (value) => getColorsWhite(value),
      };

      const totalPKAM = {
        key,
        data: store["P |KAM|"],
        getColor: (value) => getColorsWhite(value),
      };
      const totalPY_1 = {
        key,
        data: store["P |Y-1|"],
        getColor: (value) => getColorsWhite(value),
      };
      const totalSRF = {
        key,
        data: store["S |R+F|"],
        getColor: (value) => getColorsS(value),
      };
      const totalSY_1 = {
        key,
        data: store["S |Y-1|"],
        getColor: (value) => getColorsS(value),
      };
      const totalSRFUSD = {
        key,
        data: store["S |R+F| USD"],
        getColor: (value) => getColorsUSD(value),
      };
      const totalSY_1USD = {
        key,
        data: store["S |Y-1| USD"],
        getColor: (value) => getColorsUSD(value),
      };
      const totalUSDvsY_1 = {
        key,
        data: store["USD ∆ VS Y-1"],
        getColor: (value) => getColorPercentUSD(value),
      };
      const totalSRFCOP = {
        key,
        data: store["S |R+F| COP"],
        getColor: (value) => getColorsCOP(value),
      };
      const totalSY_1COP = {
        key,
        data: store["S |Y-1| COP"],
        getColor: (value) => getColorsCOP(value),
      };
      const totalCOPvsY_1 = {
        key,
        data: store["COP ∆ VS Y-1"],
        getColor: (value) => getColorPercentCOP(value),
      };
      const totalSFCSTw_1 = {
        key,
        data: store["S FCST W-1"],
        getColor: (value) => getColorsWhite(value),
      };
      const totalARFCSTw_1 = {
        key,
        data: store["AR% FCST W-1"],
        getColor: (value) => getColorPercentWhite(value),
      };
      const totalSellableInv = {
        key,
        data: store["SELLABLE INV"],
        getColor: (value) => getColorsWhite(value),
      };
      const totalDisplayInv = {
        key,
        data: store["DISPLAY INV"],
        getColor: (value) => getColorsWhite(value),
      };
      const totalWos_4QTY = {
        key,
        data: store["WOS-4 |QTY|"],
        getColor: (value) => getColorWos(value),
      };
      const totalWosM8QTY = {
        key,
        data: store["WOS+8 |QTY|"],
        getColor: (value) => getColorWos(value),
      };
      const totalWos_4AMT = {
        key,
        data: store["WOS-4 |AMT|"],
        getColor: (value) => getColorWos(value),
      };
      const totalWosM8AMT = {
        key,
        data: store["WOS+8 |AMT|"],
        getColor: (value) => getColorWos(value),
      };

      // * Se agrega cada objeto al arreglo rows utilizando spread
      rows = [
        ...rows,
        { ...totalPM },
        { ...totalPKAM },
        { ...totalPY_1 },
        { ...totalSRF },
        { ...totalSY_1 },
        { ...totalSRFUSD },
        { ...totalSY_1USD },
        { ...totalUSDvsY_1 },
        { ...totalSRFCOP },
        { ...totalSY_1COP },
        { ...totalCOPvsY_1 },
        { ...totalSFCSTw_1 },
        { ...totalARFCSTw_1 },
        { ...totalSellableInv },
        { ...totalDisplayInv },
        { ...totalWos_4QTY },
        { ...totalWosM8QTY },
        { ...totalWos_4AMT },
        { ...totalWosM8AMT },
      ];
    }
  }

  for (const key in data) {
    // * Valores de las semanas store
    const week1Values = data[key]?.Measure ?? Object.values(data.data)[0].Measure;

    // * Valores de la primera Columna
    const titulosFirstColumn4 = data
      ? Object.keys(data).flatMap((key) =>Object.keys(data[key]).filter(
            (llave) =>llave !== "Measure" && llave !== "DEALER" && llave !== "WEEK_TIPO" && llave !== "week_1")
        ): [];


    // * objeto de eresult o forcast
    const ResultForcast = data[key]?.WEEK_TIPO ?? Object.values(data)[0].WEEK_TIPO;

    return (
      <div className="table-wrapper">
        <MDBTable
        maxHeight="400px"
        scrollY
        hover
          small
          className="my-table alineacion tamanioLetra"
          bordered
          responsive={false}
          
        >
          

          <MDBTableBody>
            {/* Renderizar cada objeto en rows */}
            {rows.map((row, i) => (
              <tr key={i}>
                {/* Renderizado de la primera columna */}
                <td>{row.key}</td>
                {/* <td>{titulosFirstColumn4[i]}</td> */}
                <td  className="">{titulosFirstColumn4[i]}</td>

                {/* Renderizar cada celda horizontalmente */}
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
    );
  }
}
