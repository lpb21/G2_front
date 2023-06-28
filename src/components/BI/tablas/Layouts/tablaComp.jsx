import React from "react";
import { MDBDataTable, DataTable, MDBTable, MDBTableBody, MDBTableHead  } from "mdbreact";

export const Tabla = (
  {data,
  optionsf,
  title,
  registrost,
  idcpsi,
  rowsf
}
  ) => {
 
  return (
    // <div className="col-12">
      <div>
      {/* <div className="card"> */}
      <div>
        {/* <div className="card-header"> */}
        <div className="">
          <h3 className="card-title">
            <b>{title}</b>
          </h3>
          {/* <div className="card-tools"></div> */}
        </div>
        {/* <div className="card-body"> */}
        <div className="">
          {/* <div style={{ display: "flex", flexWrap: "wrap"}}> */}
          <div>
            <div style={{ flex: 1, overflowX: "auto" , background: "white"}}>
            
              <MDBDataTable
                bordered
                small
                data = {data}
                options = {optionsf}
                searching = {false}
                responsive= {false}
                paging= {false}
                noBottomColumns= {true}
                noRecordsFoundLabel = {registrost}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
