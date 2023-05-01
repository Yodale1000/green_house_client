import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function TemperatureChart({ data }) {
  const chartData = data.map((item) => {
    return {
      timestamp: item.timestamp,
      value: item.temperatureReading.value,
    };
  });
  if (chartData) {
    return (
      <AreaChart
        width={350}
        height={300}
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="timestamp" />
        <YAxis dataKey="value" domain={["auto", "auto"]} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          unit=" °C"
        />
      </AreaChart>
    );
  }
}
