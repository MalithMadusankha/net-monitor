import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function HistoricalTraffic() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    console.log("call fetchData");

    setLoading(true);
    try {
      const result = await axios.get(
        "http://localhost:8000/history/traffic?minutes=60"
      );
      console.log(result);

      const formatted = result.data.map((item) => ({
        time: new Date(item.timestamp).toLocaleTimeString(),
        upload: item.upload_kbps,
        download: item.download_kbps,
      }));
      setData(formatted);
    } catch (error) {
      console.error("Error fetching historical traffic:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-5">
      <div className="container_r">
        <h2>Historical Traffic (Last 60 mins)</h2>
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "40px 0",
            }}
          >
            <svg width="60" height="60" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#8884d8"
                strokeWidth="5"
                strokeDasharray="31.4 31.4"
                strokeDashoffset="0"
                strokeLinecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            <span
              style={{ marginTop: "16px", fontSize: "18px", color: "#8884d8" }}
            >
              Loading traffic data...
            </span>
          </div>
        ) : (
          <>
            <LineChart width={1050} height={500} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="upload" stroke="#8884d8" />
              <Line type="monotone" dataKey="download" stroke="#82ca9d" />
            </LineChart>

            <>
              {/* devices list */}
              {data.length === 0 ? (
                <p>No traffic data available.</p>
              ) : (
                <div>
                  <h3>Historical Traffic </h3>
                  {/* devices table */}
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      marginBottom: "24px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Time
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Upload (kbps)
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Download (kbps)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, idx) => (
                        <tr key={idx}>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {row.time}
                          </td>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {row.upload}
                          </td>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {row.download}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          </>
        )}
      </div>
    </div>
  );
}
