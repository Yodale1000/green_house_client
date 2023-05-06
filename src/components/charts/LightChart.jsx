import Chart from "react-apexcharts";

export default function LightChart({ data }) {
  const chartData = data.map((item) => {
    return {
      timestamp: item.timestamp,
      visible_plus_ir_value: item.lightReading.visible_plus_ir_value,
      infrared_value: item.lightReading.infrared_value,
    };
  });

  const series = [
    {
      name: "Visible + IR",
      data: chartData.map((obj) => {
        return [Date.parse(obj.timestamp), obj.visible_plus_ir_value];
      }),
    },
    {
      name: "Infrared",
      data: chartData.map((obj) => {
        return [Date.parse(obj.timestamp), obj.infrared_value];
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
      text: "Light (Lux)",
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
