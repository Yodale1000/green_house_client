import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function LightChart({ data }) {
  const chartData = data.map((item) => {
    return {
      timestamp: item.timestamp,
      visible_plus_ir_value: item.lightReading.visible_plus_ir_value,
      infrared_value: item.lightReading.infrared_value,
    };
  });
  if (chartData) {
    return (
      <AreaChart
        width={350}
        height={300}
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="timestamp" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="visible_plus_ir_value"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="infrared_value"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    );
  }
}
