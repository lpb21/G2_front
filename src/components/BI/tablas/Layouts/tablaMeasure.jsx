import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabla } from "./tablaComp.jsx";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

export const TablaMeasure = () => {
  const tablaMeasureGral = useSelector((state) => state.bi_wos.table_MeasureGral.data);
  
  const columns = [
    {
      label: "Measure",
      field: "titles",
      sort: "asc",
      width: 100,
      className: "table2"
    },
    {
      label: "W01",
      field: "w01",
      sort: "asc",
      width: 100
    },
    {
      label: "W02",
      field: "w02",
      sort: "asc",
      width: 100
    },
    {
      label: "W03",
      field: "w03",
      sort: "asc",
      width: 100
    },
    {
      label: "W04",
      field: "w04",
      sort: "asc",
      width: 100
    },
    {
      label: "W05",
      field: "w05",
      sort: "asc",
      width: 100,
    },
    {
      label: "W06",
      field: "w06",
      sort: "asc",
      width: 100
    },
    {
      label: "W07",
      field: "w07",
      sort: "asc",
      width: 100,
    },
    {
      label: "W08",
      field: "w08",
      sort: "asc",
      width: 100,
    }
    ,
    {
      label: "W09",
      field: "w09",
      sort: "asc",
      width: 100,
      editable: true,
    },
    {
      label: "W10",
      field: "w10",
      sort: "asc",
      width: 100,
    },
    {
      label: "W11",
      field: "w11",
      sort: "asc",
      width: 100,
    },
    {
      label: "W12",
      field: "w12",
      sort: "asc",
      width: 100,
    },
    {
      label: "W13",
      field: "w13",
      sort: "asc",
      width: 100,
    },
    {
      label: "W14",
      field: "w14",
      sort: "asc",
      width: 100,
    },
    {
      label: "W15",
      field: "w15",
      sort: "asc",
      width: 100,
    },
    {
      label: "W16",
      field: "w16",
      sort: "asc",
      width: 100,
    },
    {
      label: "W17",
      field: "w17",
      sort: "asc",
      width: 100,
    },
    {
      label: "W18",
      field: "w18",
      sort: "asc",
      width: 100,
    },
    {
      label: "W19",
      field: "w19",
      sort: "asc",
      width: 100,
    },
    {
      label: "W20",
      field: "w20",
      sort: "asc",
      width: 100,
    },
    {
      label: "W21",
      field: "w21",
      sort: "asc",
      width: 100,
    },
    {
      label: "W22",
      field: "w22",
      sort: "asc",
      width: 100,
    },
    {
      label: "W23",
      field: "w23",
      sort: "asc",
      width: 100,
    },
    {
      label: "W24",
      field: "w24",
      sort: "asc",
      width: 100,
    },
    {
      label: "W25",
      field: "w25",
      sort: "asc",
      width: 100,
    },
    {
      label: "W26",
      field: "w26",
      sort: "asc",
      width: 100,
    },
    {
      label: "W27",
      field: "w27",
      sort: "asc",
      width: 100,
    },
    {
      label: "W28",
      field: "w28",
      sort: "asc",
      width: 100,
    },
    {
      label: "W29",
      field: "w29",
      sort: "asc",
      width: 100,
    },
    {
      label: "W30",
      field: "w30",
      sort: "asc",
      width: 100,
    },
    {
      label: "W31",
      field: "w31",
      sort: "asc",
      width: 100,
    },
    {
      label: "W32",
      field: "w32",
      sort: "asc",
      width: 100,
    },
    {
      label: "W33",
      field: "w33",
      sort: "asc",
      width: 100,
    },
    {
      label: "W34",
      field: "w34",
      sort: "asc",
      width: 100,
    },
    {
      label: "W35",
      field: "w35",
      sort: "asc",
      width: 100,
    },
    {
      label: "W36",
      field: "w36",
      sort: "asc",
      width: 100,
    },
    {
      label: "W37",
      field: "w37",
      sort: "asc",
      width: 100,
    },
    {
      label: "W38",
      field: "w38",
      sort: "asc",
      width: 100,
    },
    {
      label: "W39",
      field: "w39",
      sort: "asc",
      width: 100,
    },
    {
      label: "W40",
      field: "w40",
      sort: "asc",
      width: 100,
    },
    {
      label: "W41",
      field: "w41",
      sort: "asc",
      width: 100,
    },
    {
      label: "W42",
      field: "w42",
      sort: "asc",
      width: 100,
    },
    {
      label: "W43",
      field: "w43",
      sort: "asc",
      width: 100,
    },
    {
      label: "W44",
      field: "w44",
      sort: "asc",
      width: 100,
    },
    {
      label: "W45",
      field: "w45",
      sort: "asc",
      width: 100,
    },
    {
      label: "W46",
      field: "w46",
      sort: "asc",
      width: 100,
    },
    {
      label: "W47",
      field: "w47",
      sort: "asc",
      width: 100,
    },
    {
      label: "W48",
      field: "w48",
      sort: "asc",
      width: 100,
    },
    {
      label: "W49",
      field: "w49",
      sort: "asc",
      width: 100,
    },
    {
      label: "W50",
      field: "w50",
      sort: "asc",
      width: 100,
    },
    {
      label: "W51",
      field: "w51",
      sort: "asc",
      width: 100,
    },
    {
      label: "W52",
      field: "w52",
      sort: "asc",
      width: 100,
    },
  ];

  let rows = [];
  if (tablaMeasureGral && tablaMeasureGral && tablaMeasureGral.length > 0) {
    const data = tablaMeasureGral;
    const titles = Object.keys(data[0]).filter((key) => key !== "week_1");


    titles.forEach((title) => {
      const row = { titles: title };
      data.forEach((week) => {
        row[week.week_1.toLowerCase()] = week[title];
      });
      rows.push(row);
    });
  }

  const data = {
    columns,
    rows,
  };

  
  const options = {
    searching: false,
    responsive: true,
    entries: false,
    info: false,
    paging: false,
    noBottomColumns: true,
  };

  const registrost = "Click en el boton para visualizar registros";
  const idTabla = "tablaCPSI";


  return (
    <div className="alineacion tamanioLetra ">
      <Tabla
        //title = "Tabla General Measure"
        //columns = {columns}
        //rows = {modifiedTablaMeasureGral}
        //data={tablaMeasureGral}
        data={data}
        optionsf={options}
        registrost={registrost}
      />
    </div>
  );
};
