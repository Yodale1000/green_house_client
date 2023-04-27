import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import axios from "axios";

const HOST = import.meta.env.API_HOST || "http://localhost:8000";

export default function HumidityChart({ device }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(HOST + "/humidityReadings", {
        params: { deviceName: device.name },
      })
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (data) {
    return (
      <AreaChart
        width={350}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis dataKey="value" />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    );
  }
}
