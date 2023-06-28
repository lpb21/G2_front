import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { SelectOptions } from "../form/select/pages/select";
import {
  cpsGeneral,
  startChannel,
  cpsMeasure,
  cpsTablaGeneral,
  dataNewCPSI,
  // dataNewCPSIView,
  cpsNewMeasure,
  dataNewCPSIFilterDealer,
  onDealerChannels,
  onChannelsMJ,
  onDealerssMJ,
  setChannel,
  onDealerChannelsDefault,
  onDealerMCDefault
  //onStatusPg2
} from "../../slices/bi/thunks";
import {
  changingLoadingAllDealers,
  setDealerSelected,
} from "../../slices/bi/wosSlice";
import { Loading } from "../modal/Loading";

export const Filtros = () => {
  const loading = useSelector((state) => state.bi_wos.isLoading);

  const {
    channel,
    dealer,
    pg: PG,
    pg2: PG2,
    status: Status,
    ar: aprovedReference,
    //km: keyModels,
    pg_tool: PG_Tool,
    year,
    regional,
    majorCostmr, // * Major Costumer
    dealerSelected,
  } = useSelector((state) => state.bi_wos);

  const [mCdefaultFilters, setMCDefaultFilters] = useState([]);
  const [channelDefaultFilters, setchannelDefaultFilters] = useState([]);
  const [dealerDefault, setdealerDefault] = useState([]);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  // dispatch(dataNewCPSI(filtrosIniciales));

  const updateFilters = (name, values = []) => {
    const data = values.map(({ value }) => value);
    setFilters((state) => ({
      ...state,
      [name]: data,
    }));
  };

  // const updateFiltersChannelAndMJ = (name, values) => {
  //   const channelsOnMJ = values.map(({ value }) => value);
  //   let filterValue = {
  //     [name]: channelsOnMJ,
  //   };

  //   setFilters((state) => ({
  //     ...state,
  //     ...filterValue,
  //   }));

  //   dispatch(onDealerChannels({
  //     ...filterValue,
  //     // ...mj,
  //   }));

  //   dispatch(onChannelsMJ(filterValue));
  //   dispatch(onDealerssMJ(filterValue));
  // }

  // const updateFiltersChannel = (name, values) => {
  //   updateFiltersChannelAndMJ(name, values);
  // };

  // const updateFiltersMJ = (name, values) => {
  //   updateFiltersChannelAndMJ(name, values);
  // }

  // * Constantes que se actualizan con base a la seleccion de filtros

  // * Update con base al Major Costumer
  const updateFiltersMJ = (name, values) => {
    const channelsOnMJ = values.map(({ value }) => value);
    let filterValueChannel = {
      [name]: channelsOnMJ,
    };

    //Default Values Dealer on Major Costumer.
    const ondefaultDealerMC = async () => {
      const { data } = await onDealerMCDefault(filterValueChannel);
      setdealerDefault(data);

      setFilters((state) => ({
        ...state,
        ...{
          ["DEALER"]: data.map(({ value }) => value),
        },
      }));
    };
    ondefaultDealerMC();

    setFilters((state) => ({
      ...state,
      ...filterValueChannel,
    }));
    // setMj(filterValueChannel)

    dispatch(onChannelsMJ(filterValueChannel));
    dispatch(onDealerssMJ(filterValueChannel));
    // dispatch(onChannelsMJ(filterValueChannel))
  };

  // * Update con base a Channel
  const updateFiltersChannel = (name, values) => {
    const dealerOnchannels = values.map(({ value }) => value);
    let filterValueChannel = {
      [name]: dealerOnchannels,
    };

    //Default Values Dealer.
    const ondefaultDealer = async () => {
      const { data } = await onDealerChannelsDefault(filterValueChannel);
      setdealerDefault(data);

      setFilters((state) => ({
        ...state,
        ...{
          ["DEALER"]: data.map(({ value }) => value),
        },
      }));
    };
    ondefaultDealer();

    setFilters((state) => ({
      ...state,
      ...filterValueChannel,
    }));

    // dispatch(onDealerssMJ(filterValueChannel));
    // dispatch(onChannelsMJ(filterValueChannel))
  };

  const updateFiltersDealer = (name, values) => {
    const dealerOnchannels = values.map(({ value }) => value);
    let filterValueDealer = {
      [name]: dealerOnchannels,
    };
    // cambiar Estados Default Dealer.
    setdealerDefault(values);

    setFilters((state) => ({
      ...state,
      ...filterValueDealer,
    }));
  };

  const enviarSeleccion = () => {
    dispatch(changingLoadingAllDealers(false));
    dispatch(cpsGeneral(filters));
    dispatch(cpsMeasure(filters));
    dispatch(cpsTablaGeneral(filters));

    dispatch(cpsNewMeasure(filters));
    dispatch(dataNewCPSI(filters));
    dispatch(dataNewCPSIFilterDealer(filters));

    // dispatch(dataNewCPSIFilterDealer(filtrosIniciales));

    //dispatch(changingLoadingAllDealers(true));
  };

  const SelectDealer = ({ defaultValue = [] }) => {
    return (
      <div>
        <label>Dealer</label>
        <Select
          id="dealer"
          label="Dealer"
          placeholder="Filtro de Dealer"
          options={dealer}
          name="DEALER"
          // defaultValue={dealerdefaultFilters}
          defaultValue={defaultValue}
          onChange={(e) => {
            updateFiltersDealer("DEALER", e);
          }}
          isMulti
        />
      </div>
    );
  };

  useEffect(() => {
    dispatch(startChannel());
    dispatch(cpsGeneral(filters));
    dispatch(cpsNewMeasure(filters));
    dispatch(dataNewCPSI(filters));
    // dispatch(dataNewCPSIView(filters))
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return loading ? (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <label>Channel</label>
          <Select
            id="channel"
            label="Channel"
            placeholder="Filtro de Channel"
            options={channel}
            isMulti
            maxSelections="5"
            // defaultValue={channelDefaultFilters}
            onChange={(e) => {
              updateFiltersChannel("CHANNEL", e);
            }}
            name="CHANNEL"
          />

          <label>PG</label>
          <Select
            id="pg"
            options={PG}
            label="Pg"
            placeholder="Filtro de PG"
            name="PG"
            isMulti
            onChange={(e) => {
              updateFilters("PG", e);
            }}
          />

          <label>Status</label>
          <Select
            id="status"
            options={Status}
            label="Status"
            isMulti
            placeholder="Filtro de Status"
            name="STATUS"
            onChange={(e) => {
              updateFilters("STATUS", e);
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <SelectDealer defaultValue={dealerDefault} />

          <label>PG2</label>
          <Select
            id="pg2"
            options={PG2}
            label="Pg2"
            isMulti
            placeholder="Filtro de PG 2"
            name="PG2"
            onChange={(e) => {
              updateFilters("PG2", e);
            }}
          />
          <label>Year</label>
          <Select
            id="YEAR_1"
            label="Year"
            placeholder="Filtro de Year"
            options={year}
            name="YEAR_1"
            isMulti
            onChange={(e) => {
              updateFilters("YEAR_1", e);
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Major Costumer</label>
          <Select
            id="majorCostumer"
            options={majorCostmr}
            label="Major Costumer"
            placeholder=" Filtro de Major Costumer"
            name="FOCO"
            onChange={(e) => {
              updateFiltersMJ("FOCO",e)
            }}
            isMulti
          />
          <label>PG Tool</label>
          <Select
            id="pg_tool"
            options={PG_Tool}
            label="Pg Tool"
            placeholder=" Filtro de PG Tool"
            name="PG_TOOL"
            isMulti
            onChange={(e) => {
              updateFilters("PG_TOOL", e);
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Aproved Reference</label>
          <Select
            id="aprovedReference"
            options={aprovedReference}
            label="Aproved Reference"
            placeholder="Filtro de Aproved Reference"
            name="APPROVED_REFERENCE"
            isMulti
            onChange={(e) => {
              updateFilters("APPROVED_REFERENCE", e);
            }}
          />

          <label>Regional</label>
          <Select
            id="regional"
            options={regional}
            label="Regional"
            placeholder="Filtro de Regional"
            name="REGIONAL"
            isMulti
            onChange={(e) => {
              updateFilters("REGIONAL", e);
            }}
          />
        </div>
      </div>
      <button
        type="button"
        id="enviar_dato"
        name="enviar_dato"
        className="btn btn-primary raise"
        style={{
          cursor: "pointer",
          marginTop: "20px",
          backgroundColor: "#a7124c",
        }}
        onClick={enviarSeleccion}
      >
        Enviar Datos
      </button>
    </>
  ) : (
    <Loading />
  );
};
