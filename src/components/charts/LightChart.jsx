import Chart from "react-apexcharts";

export default function LightChart({ data }) {
  const chartData = data.map((item) => {
    return {
      timestamp: item.timestamp,
      value: item.lightReading.value,
    };
  });

  const series = [
    {
      name: "Light",
      data: chartData,
    },
  ];

  const options = {
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      noData: {
        text: "Loading...",
      },
    },
  };

  return <Chart options={options} series={series} type="area" height={350} />;
}
