import Chart from "react-apexcharts";

export default function HumidityChart({ data }) {
  const chartData = data.map((item) => {
    return {
      timestamp: item.timestamp,
      value: item.humidityReading.value,
    };
  });

  const series = [
    {
      name: "Humidity",
      data: chartData.map((obj) => {
        return [Date.parse(obj.timestamp), obj.value.toFixed(2)];
      }),
    },
  ];

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
      xaxis: {
        type: "datetime",
      },
    },
    noData: {
      text: "No Data",
    },
    title: {
      text: "Humidity (%)",
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

  return <Chart options={options} series={series} type="area" height={350} />;
}
