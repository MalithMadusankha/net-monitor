import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "../asserts/Header.css";

export default function LiveTraffic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/traffic");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      // You can set state to show a warning message or silently ignore
    };

    ws.onclose = (event) => {
      console.log("WebSocket closed:", event);
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setData((prevData) => [
          ...prevData.slice(-19),
          {
            time: new Date().toLocaleTimeString(),
            upload: msg.upload_kbps,
            download: msg.download_kbps,
          },
        ]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="mt-10">
      <div className="container">
        <h2>Live Network Traffic</h2>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="upload" stroke="#8884d8" />
          <Line type="monotone" dataKey="download" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
}
