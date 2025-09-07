import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingUI from "./LoadingUI";

export default function Devices() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    console.log("call fetchData");

    setLoading(true);
    try {
      const result = await axios.get("http://localhost:8000/networks");
      console.log("result :", result.data.devices);

      setData(result.data.devices);
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
    <div className="">
      <div className="container_r">
        <h2>Devices in the Network</h2>
        <div>
          {loading ? (
            <LoadingUI name="Devices" />
          ) : (
            <>
              {/* devices list */}
              {data.length === 0 ? (
                <p>No devices data available.</p>
              ) : (
                <div>
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
                          IP
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Hostname
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          MAC
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Ping (ms)
                        </th>
                        <th
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          Last Seen
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, idx) => (
                        <tr key={idx}>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {row.ip}
                          </td>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {row.hostname}
                          </td>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {row.mac}
                          </td>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {row.ping_ms}
                          </td>
                          <td
                            style={{ border: "1px solid #ddd", padding: "8px" }}
                          >
                            {row.last_seen}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
