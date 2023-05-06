import Chart from "react-apexcharts";

export default function TemperatureChart({ data }) {
  const chartData = data.map((item) => {
    return {
      timestamp: item.timestamp,
      value: item.temperatureReading.value,
    };
  });

  const series = [
    {
      name: "Temperature",
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
    },
    noData: {
      text: "No Data",
    },
    title: {
      text: "Temperature (C)",
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
