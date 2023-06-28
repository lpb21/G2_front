import { instanceAxios } from "../../axios";
import {
  changeLoading,
  changingLoadingAllDealers,
  changingLoadingDownDealersTable,
  setChannel,
  setDealer,
  setDealerSelectedMJ,
  setChannelSelectedMJ,

  setPg,
  setPg_2,
  setPg_Tool,
  setStatus,
  setAprovedRef,
  //setKeyModels,
  setYear,
  setRegional,
  setMajorCostmr,
  setChannelpsi,
  setFilterWos,
  //setMeasureAnioAnterior,
  //setMeasureAnioActual,
  setMeasureGeneral,
  setTableCPSIGral,
  setTableNewCPSI,
  setTableNewCPSIView,
  setTableNewMeasure,
  setTableCpsiFilterDealer,
  setStateGeneral,
  settitulosFirstTable,
} from "./wosSlice";

const createFilter = (data = []) => {
  const result = data.map((e) => {
    return e.value;
  });
  return result;
};

export const  startChannel = () => {
  return async (dispatch) => {
    // Assign Channel
  try {


  // * Get Major Costumer BI
const { data: responseMajorCostmr } = await instanceAxios.get(`/v1/getMajorCostumer`, {});
const { data: majorCostmrBI } = responseMajorCostmr;
const filterMAAnt = createFilter(majorCostmrBI);
// Asignar AR al Slice -> Store
dispatch(setMajorCostmr(majorCostmrBI));
// Se cargó en su totalidad
//dispatch(changeLoading(true));

// * Get Channel
    const { data } = await instanceAxios.get(`/v1/getChannel`);
    const { data: allChannel } = data;
    const channels = createFilter(allChannel);
    dispatch(setChannel(allChannel));



  //   // * Get Channel con base al major costumer
  // // const { dataMC } = await instanceAxios.get(`/v1/getChannel`);
  // const { data: channelMC } = await instanceAxios.get(`/v1/getChannel`, {
  //   params: {
  //     FOCO: filterMAAnt,
  //   }
  //   //console.log(FOCO);
  // });
  // const { data: dataChannelsMC } = channelMC;
  //  const channelsMC = createFilter(dataChannelsMC);
  // dispatch(setChannelSelectedMJ(dataChannelsMC));




      // * Get Dealer
      const { data: dealer } = await instanceAxios.get(`/v1/getDealer`, {
        params: {
          CHANNEL: channels,
        },
      });
      const { data: dealers } = dealer;
      const filterDealer = createFilter(dealers);
      // Asignar Dealer al Slice -> Store
      // dispatch(setDealer(dealers))



    // // * Get Dealer CON BASE A Major Costumer
    // const { data: dealermj } = await instanceAxios.get(`/v1/getChannel`, {
    //   params: {
    //     FOCO: filterMAAnt,
    //   },
    // });
    // const { data: dealersmj } = dealermj;
    // const filterDealermj = createFilter(dealers);
    // // Asignar Dealer al Slice -> Store
    
    // dispatch(setDealerSelectedMJ(dealersmj));



      // * Get Pg
      const { data: responsePG } = await instanceAxios.get(`/v1/getPG`, {
        params: {
          DEALER: filterDealer,
        },
      });
      const { data: pgs } = responsePG;
      const filterPG = createFilter(pgs);
      // Asignar PG al Slice -> Store
      // dispatch(setPg(pgs))

      // * Get pg_ tool
      const { data: responsePG_Tool } = await instanceAxios.get(`/v1/getPG_Tool`,{
          params: {
            // PG_TOOL: filterPG,
          },
        }
      );
      const { data: pg_Tools } = responsePG_Tool;
      const filterPG_Tools = createFilter(pg_Tools);
      // Asignar PG_TOOLS al Slice -> Store
      // dispatch(setPg_Tool(pg_Tools));

      // * Get pg 2
      const { data: responsePG_2 } = await instanceAxios.get(`/v1/getPG2`, {
        params: {
          // PG2: filterPG_Tools,
        },
      });
      const { data: pg_2 } = responsePG_2
      const filterPG_2 = createFilter(pg_2)
      // Asignar PG2 al Slice -> Store
      // dispatch(setPg_2(pg_2))

      // * Get Status
      const { data: responseStatus } = await instanceAxios.get(`/v1/getStatus`, {
        params: {
          // STATUS: filterPG_2,
        },
      });
      const { data: status } = responseStatus
      const filterStatus = createFilter(status)
      // Asignar STATUS al Slice -> Store
      // dispatch(setStatus(status))

    
      // * Get Aproved Reference
      const { data: responseAR } = await instanceAxios.get(`/v1/getAR`, {
        params: {
          // STATUS: filterStatus,
        },
      });
      const { data: ar } = responseAR;
      //const filterAR = createFilter(ar);
      // Asignar AR al Slice -> Store
      // dispatch(setAprovedRef(ar));
    


      // * Get Year BI
      const { data: responseYear } = await instanceAxios.get(`/v1/getYearBI`, {});
      const { data: yearBI } = responseYear;
      //const filterMAAnt = createFilter(mAAnt);
      // Asignar AR al Slice -> Store
      // dispatch(setYear(yearBI))


      // * Get Regional BI
      const { data: responseRegional } = await instanceAxios.get(`/v1/getRegional`, {});
      const { data: regionalBI } = responseRegional;
      //const filterMAAnt = createFilter(mAAnt);
      // Asignar AR al Slice -> Store
      // dispatch(setRegional(regionalBI))


      const general = {
        channel: allChannel,
        dealer : dealers,
        pg: pgs,
        pg_tool: pg_Tools,
        pg2: pg_2,
        status,
        ar,
        year: yearBI,
        regional: regionalBI,
        majorCostmr: majorCostmrBI,
        isLoading: true
      }
      
      dispatch(setStateGeneral(general))
    } catch (error) {
      console.error('Error al obtener', error);
    }
    
    
  }
}

// * servicio de graficos generales
export const cpsGeneral = (e) => {
  return async (dispatch) => {
    const { data } = await instanceAxios.get(`/v1/getDataWithFilters`, {
      params: {
        ...e,
      },
    });

    // Asignar Filtros
    dispatch(setFilterWos(e))
    // Asignar Al Store
    dispatch(setChannelpsi(data))
  };
};

// * Servicio de measure
export const cpsMeasure = (e) => {
  return async (dispatch, getState) => {
    const { data } = await instanceAxios.get(
      `/v1/getMeasureGeneral`,
      {
        params: {
          ...e,
        },
      }
    );
    // Asignar Filtros
    //dispatch(setMeasureGeneral(e))
    // Asignar Al Store
    dispatch(setMeasureGeneral(data));
  };
}

// * Servicio de measure reestructurado
export const cpsNewMeasure = (e) => {
  return async (dispatch) => {
    const { data } = await instanceAxios.get(
      `/v1/getMeasureGeneral2`,

      {
        params: {
          ...e,
        },
      }
    )
    dispatch(setTableNewMeasure(data))
    // dispatch(changeLoading(true))
  }
}

// * Servicio de Tabla Channel PSI General
export const cpsTablaGeneral = (e) => {
  return async (dispatch) => {
    const { data } = await instanceAxios.get(
      `/v1/getTableCPSI`,

      {
        params: {
          ...e,
        },
      }
    );

    // Asignar Filtros
    //dispatch(setMeasureGeneral(e))
    // Asignar Al Store
    dispatch(setTableCPSIGral(data));
  };
}

// * Servicio de Tabla Channel PSI General con el servicio estructurado
export const dataNewCPSI = (e) => {
  return async (dispatch) => {
    const { data } = await instanceAxios.get(`/v1/getTablaNewCPSI`,

      {
        params: {
          ...e,
        },
      }
    );
    // Asignar Al Store
    dispatch(setTableNewCPSI(data))
    // * dispatch que actualiza el modal loading cuando hay datos
    // dispatch(changingLoadingAllDealers(true))
    dispatch(changeLoading(true))
  

  }
}


// * Servicio de Tabla Channel PSI General con el servicio estructurado
// export const dataNewCPSIView = (e) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await instanceAxios.get(`/v1/getTablaNewCPSIView`, {
//         params: {
//           ...e,
//         },
//         timeout: 70000, // Tiempo de espera en milisegundos
//       })
//       // Asignar al Store.
//       dispatch(setTableNewCPSIView(data))
//       // cambiamos loading.
//       //dispatch(changeLoading(true))
//     } catch (error) {
//       console.error('Error en la solicitud:', error);
//       // Manejar el error de manera adecuada
//     }
//   };
// };


// * Servicio de Tabla Channel PSI con el servicio de acuerdo al DEALER
export const dataNewCPSIFilterDealer = (e) => {
  return async (dispatch) => {
    
    try {
      const { data } = await instanceAxios.get(
      `/v1/getTablaCPSIWhitOutDealer`,

      {
        params: {
          ...e,
        },
      }
    )
     //Asignar los titulos.
    dispatch(settitulosFirstTable(data.data)) 
    let dealers = Object.keys(data.data) || []
    let dataforDealer = []
    for (const dealer in dealers) {
      let dataTitle = {
        ...data.data[dealers[dealer]],
        title: dealers[dealer]
      }
      dataforDealer = [
        ...dataforDealer,
        dataTitle
      ]
    }
      dispatch(setTableCpsiFilterDealer({
        data :dataforDealer 
      }))
      dispatch(changingLoadingAllDealers(true))
    } catch(error) {
      
    }
  }
}

// ! Constantes para la actualizacion de valores de acuerdo a la seleccion de los filtros
// *  Obtener Channels con base a la seleccion en Major Costumer
export const onChannelsMJ = (params = {}) => {
  return async (dispatch) => {
    const { data:filterMAAnt } = await instanceAxios.get(`/v1/getChannel`, {
      params
    })
    const { data: majorCostmrBI } = filterMAAnt;
    dispatch(setChannel(majorCostmrBI));
    
  }
}


// *  Obtener Dealers con base a la seleccion en Major Costumer
export const onDealerssMJ = (params = {}) => {
  return async (dispatch) => {
    const { data:filterMAAnt } = await instanceAxios.get(`/v1/getDealer`, {
      params
    })
    const { data: majorCostmrBI } = filterMAAnt;
    dispatch(setDealer(majorCostmrBI));
    
  }
}

// *  Obtener Dealers con base a la seleccion de channel
export const onDealerChannels = (params = {}) => {
  return async (dispatch) => {
    
    const { data:dealer } = await instanceAxios.get(`/v1/getDealer`, {
      params,
    })
    const { data: dealers } = dealer;
    dispatch(setDealer(dealers));
    
  }
}

export const onPGDealers = (params = {}) => {
  return async (dispatch) => {
    
    const { data:responsePG } = await instanceAxios.get(`/v1/getPG`, {
      params,
    })
    const { data: pgs } = responsePG;
    dispatch(setPg(pgs));
  }
}

// * Get pg_ tool
export const onPgTOOLPG = (params = {}) => {
  return async (dispatch) => {
    const { data: responsePG_Tool } = await instanceAxios.get(`/v1/getPG_Tool`,{
        params,
      })
    const { data: pg_Tools } = responsePG_Tool;
    // Asignar PG_TOOLS al Slice -> Store
    dispatch(setPg_Tool(pg_Tools))
  }
}

export const onDealerChannelsDefault = async (params = {}) => {
  
  try {
    const { data } = await instanceAxios.get(`/v1/getDealer`, {
      params
    })
    return data
  } catch (error) {

  }
}

export const onDealerMCDefault = async (params = {}) => {
  try {
    const { data } = await instanceAxios.get(`/v1/getDealer`, {
      params
    })
    return data
  } catch (error) {
    throw new Error(error.message || error.stack || 'error / line 438 GetFilters_Dealer_On_MC')
  }
}


