import Chart from "react-apexcharts";

export default function MyChart(props) {
  const options = {
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
    },
    noData: {
      text: "No Data",
    },
    title: {
      text: props.title,
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      x: {
        format: "HH:mm dd MMM yyyy",
      },
    },
  };

  return (
    <Chart options={options} series={props.series} type="area" height={350} />
  );
}
