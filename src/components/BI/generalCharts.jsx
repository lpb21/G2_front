import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect , useState } from "react";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsStock from "highcharts/modules/stock";
import HighchartsData from "highcharts/modules/data";
import HighchartsExporting from "highcharts/modules/exporting";
import { useSelector } from "react-redux";




HighchartsAccessibility(Highcharts);
HighchartsStock(Highcharts);
HighchartsData(Highcharts);
HighchartsExporting(Highcharts);



const option = {
  chart: {
    height: "30%",
    backgroundColor: "#f9f4f6",
    alignTicks: true,
    borderWidth: 2,
    borderColor: "#000000",
    style: {
      fontFamily: 'Arial Narrow',
      fontSize: "18px",
    },
  },
  title: {
    text: "",
  },
  subtitle: {
  },
  accessibility: {
    series: {
      descriptionFormat: "{seriesDescription}.",
    },
    description:
      "Use the dropdown menus above to display different indicator series on the chart.",
    screenReaderSection: {
      beforeChartFormat:
        "<{headingTagName}>{chartTitle}</{headingTagName}><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div>",
    },
  },
  rangeSelector: {
    allButtonsEnabled: true,
    selected: 1,
    //verticalAlign: 'bottom'
  },
  scrollbar: {
    enabled: true, // habilita el scrollbar
    showFull: true, // mostrar todo el contenido del gráfico al principio
    liveRedraw: true, // redibujar el gráfico en tiempo real cuando se arrastra el scrollbar
  },
  navigator: {
    outlineColor: "black",
    opposite: false,
    maskInside: true,    
    enabled: true,
    series: {
      type: "line",
      color: "red",
      fillOpacity: 0.03,
      lineWidth: 2,
      showInNavigator: true,
      maskFill: "black"
    },
    xAxis: {
      categories: [],
    },
  },
  xAxis: {
    categories: [],
    crosshair: {
      width: 1,
      color: "red",
    },
  },
  yAxis: [
    {
      title: {
        text: "Unidades",
      },
      height: "70%",
      crosshair: {
        width: 1,
        color: "red",
      },
    },
    {
      title: {
        text: "",
      },
      //height: "",
      crosshair: {
        width: 1,
        color: "red",
      },
      opposite: true,
    },
    {
      title: {
        text: " ",
      },
      top: "75%",
      height: "25%",
      offset: 0,
    },
  ],
  tooltip: {
    enabled: true,
    shared: true,
    //backgroundColor: 'white'
    borderRadius: 20,
    //borderWidth: 1,
    borderColor: 'red',
  },
  series: [
    {
      type: "column",
      name: "S [Y-1] ",
      data: [],
      color: "#a6a6a6",
      yAxis: 1,
      
    },
    {
      type: "column",
      name: "S [R+F]",
      data: [],
      color: "#c00000",
      yAxis: 1,
    },
    {
      name: "SELLABLE [Y-1]",
      data: [],
      marker: {
        enabled: true,
        radius: 3,
        symbol: 'circle'
      },
      dashStyle: "shortdot",
      type: "spline",
      color: "#a6a6a6",
      annotations: [
        {
          labels: [
            {
              point: "max",
              text: "Max",
            },
            {
              point: "min",
              text: "Min",
              backgroundColor: "green",
            },
          ],
        },
      ],
    },
    {
      name: "SELLABLE [R+F]",
      data: [],
      marker: {
        enabled: true,
        radius: 3,
      },
      dashStyle: "shortdot",
      type: "spline",
      color: "#c00000",
      annotations: [
        {
          labels: [
            {
              point: "max",
              text: "Max",
            },
            {
              point: "min",
              text: "Min",
              backgroundColor: "green",
            },
          ],
        },
      ],
    },
    {
      name: "P [Y-1]",
      data: [],
      marker: {
        enabled: true,
        radius: 3,
      },
      dashStyle: "solid", //"longdash",
      type: "spline",
      color: "#ea4b31",
      annotations: [
        {
          labels: [
            {
              point: "max",
              text: "Max",
            },
            {
              point: "min",
              text: "Min",
              backgroundColor: "green",
            },
          ],
        },
      ],
    },
    {
      name: "P [R+F]",
      data: [],
      marker: {
        enabled: true,
        radius: 3,
      },
      dashStyle: "solid", //"longdash",
      type: "spline",

      color: "#0f6200",
      annotations: [
        {
          labels: [
            {
              point: "max",
              text: "Max",
            },
            {
              point: "min",
              text: "Min",
              backgroundColor: "green",
            },
          ],
        },
      ],
    },
  ],
}



export const GraficosCombinados = () => {
  const [options, setOptions] = useState(option)
  const { data } = useSelector((state) => state.bi_wos.table_cpsi)
  useEffect(() => {
  }, [options])

  useEffect(() => {
    // * Datos de las semanas
    const weeks = data.map((obj) => obj.week_1);
    // * Datos del año ANTERIOR S[Y-1]
    const anioAnteriorSRF = data.map((obj) => obj.SELL_RF_ANIO_ANTERIOR)
    // * Datos del año ACTUAL S[R+F]
    const anioActualSRF = data.map((obj) => obj.SELL_RF_ANIO_ACTUAL)
    // * Datos de año ANTERIOR Inventario Sellable
    const anioAnteriorInvSell = data.map(
      (obj) => obj.ANIO_ANTERIOR_SELL_INV
    )
    // * Datos de año ACTUAL Inventario Sellable
    const anioActualInvSell = data.map((obj) => obj.ANIO_ACTUAL_SELL_INV)
    // * Datos de año ANTERIOR  P[Y-1]
    const anioAnteriorPRF = data.map((obj) => obj.RF_ANIO_ANTERIOR)
    // * Datos de año ACTUAL P[R+F]
    const anioActualPRF = data.map((obj) => obj.RF_ACTUAL)
    

    const change =  { 
      navigator: {
        outlineColor: "black",
        opposite: false,
        maskInside: true,    
        enabled: true,
        series: {
          type: "line",
          color: "red",
          fillOpacity: 0.03,
          lineWidth: 2,
          showInNavigator: true,
          maskFill: "black"
        },
        xAxis: {
          categories: weeks || [],
        }
      },
      xAxis: {
        categories: weeks || [],
        crosshair: {
          width: 1,
          color: "red",
        },
      },
      series: [
        {
          type: "column",
          name: "S [Y-1] ",
          data: anioAnteriorSRF,
          color: "#a6a6a6",
          yAxis: 1,
          
        },
        {
          type: "column",
          name: "S [R+F]",
          data: anioActualSRF,
          color: "#c00000",
          yAxis: 1,
        },
        {
          name: "SELLABLE [Y-1]",
          data: anioAnteriorInvSell,
          marker: {
            enabled: true,
            radius: 3,
            symbol: 'circle'
          },
          dashStyle: "shortdot",
          type: "spline",
          color: "#a6a6a6",
          annotations: [
            {
              labels: [
                {
                  point: "max",
                  text: "Max",
                },
                {
                  point: "min",
                  text: "Min",
                  backgroundColor: "green",
                },
              ],
            },
          ],
        },
        {
          name: "SELLABLE [R+F]",
          data: anioActualInvSell,
          marker: {
            enabled: true,
            radius: 3,
          },
          dashStyle: "shortdot",
          type: "spline",
          color: "#c00000",
          annotations: [
            {
              labels: [
                {
                  point: "max",
                  text: "Max",
                },
                {
                  point: "min",
                  text: "Min",
                  backgroundColor: "green",
                },
              ],
            },
          ],
        },
        {
          name: "P [Y-1]",
          data: anioAnteriorPRF,
          marker: {
            enabled: true,
            radius: 3,
          },
          dashStyle: "solid", //"longdash",
          type: "spline",
          color: "#ea4b31",
          annotations: [
            {
              labels: [
                {
                  point: "max",
                  text: "Max",
                },
                {
                  point: "min",
                  text: "Min",
                  backgroundColor: "green",
                },
              ],
            },
          ],
        },
        {
          name: "P [R+F]",
          data: anioActualPRF,
          marker: {
            enabled: true,
            radius: 3,
          },
          dashStyle: "solid", //"longdash",
          type: "spline",
    
          color: "#0f6200",
          annotations: [
            {
              labels: [
                {
                  point: "max",
                  text: "Max",
                },
                {
                  point: "min",
                  text: "Min",
                  backgroundColor: "green",
                },
              ],
            },
          ],
        },
      ]
    }

    setOptions({
      ...options,
      ...change
    })
  }, [data])

  useEffect(() => {
  }, [])

  return (
    <div>
      {/* <CandlestickChart data={"candlestickData"} /> */}
      {/* <BarChart data={"barData"} /> */}
      <HighchartsReact
        filterstabsGrafComb={""}
        highcharts={Highcharts}
        //constructorType={"stockChart"}
        options={options}
      />
    </div>
  )
}
