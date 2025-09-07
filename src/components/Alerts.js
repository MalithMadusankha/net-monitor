import React, { useState } from "react";
import axios from "axios";
import LoadingUI from "./LoadingUI";

export default function Alerts() {
  const [ip, setIp] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkAlert = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`http://localhost:8000/alerts/${ip}`);
      console.log("alert", result.data);

      setAlert(result.data);
    } catch (error) {
      setAlert({ ip, status: "Error", latency_ms: "N/A" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="mt-5"
      style={{
        fontFamily: "Arial, sans-serif",
      }}
    >
      {loading ? (
        <>
          <LoadingUI name="Ping" />
        </>
      ) : (
        <div
          className="container"
          style={{
            maxWidth: "500px",
            height: "150px",
            margin: "0 auto",
            background: "#fff",
            padding: "32px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          }}
        >
          <div>
            <h2 style={{ color: "#007bff", marginBottom: "24px" }}>
              Alert Check
            </h2>
            <input
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="Enter IP"
              style={{
                padding: "8px 12px",
                border: "1px solid #ced4da",
                borderRadius: "4px",
                marginRight: "8px",
                width: "60%",
                fontSize: "16px",
              }}
            />
            <button
              onClick={checkAlert}
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Check
            </button>
            {alert && (
              <p
                style={{
                  marginTop: "24px",
                  fontSize: "17px",
                  color: alert.status === "Error" ? "#dc3545" : "#28a745",
                }}
              >
                {alert.ip} is {alert.status} ({" "}
                {alert.latency_ms
                  ? "Latency: " + alert.latency_ms + "ms"
                  : "Not avilable"}{" "}
                )
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
