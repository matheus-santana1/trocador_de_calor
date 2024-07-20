import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import "./chart.css";

type ChartProps = {
  disable: boolean;
};

export default function Chart(props: ChartProps) {
  const series = [
    {
      name: "Temperatura de Entrada",
      data: [3, 7, 12, 18, 25, 32, 40, 50, 65, 80, 85, 90, 100, 120],
    },
    {
      name: "Temperatura de Saída",
      data: [3, 7, 12, 18, 25, 32, 40, 50, 65, 80, 85, 90, 100, 120],
    },
  ];
  const options: ApexOptions = {
    series: [
      {
        name: "Temperatura de Entrada",
        data: [],
      },
      {
        name: "Temperatura de Saída",
        data: [],
      },
    ],
    chart: {
      id: "chart",
      type: "line",
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 250,
        },
      },
      foreColor: "black",
      background: "#fff",
      toolbar: {
        offsetY: 6,
      },
    },
    legend: {
      position: "top",
      offsetX: 425,
      offsetY: 10,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      title: {
        text: "Tempo(s)",
        offsetY: -10,
        style: {
          fontSize: "15px",
          fontWeight: 400,
          fontFamily: "Arial",
        },
      },
      labels: {
        rotate: 0,
        style: {
          fontFamily: "Arial",
        },
      },
      categories: [],
    },
    yaxis: {
      min: -20,
      tickAmount: 7,
      title: {
        text: "Temperatura(°C)",
        offsetX: 4,
        rotate: -90,
        style: {
          fontSize: "15px",
          fontWeight: 400,
          fontFamily: "Arial",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Arial",
        },
        formatter: function (value) {
          return Math.round(value).toString();
        },
      },
    },
    theme: {
      monochrome: {
        enabled: props.disable,
        color: "#afafaf",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
  };

  return (
    <>
      <div style={{ marginTop: 40, pointerEvents: props.disable ? "none" : undefined }}>
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
    </>
  );
}
