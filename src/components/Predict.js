import React, { useState } from "react";
import axios from "axios";
import LoadingUI from "./LoadingUI";

const inputStyle = {
  padding: "8px 12px",
  border: "1px solid #ced4da",
  borderRadius: "4px",
  marginBottom: "8px",
  width: "100%",
  fontSize: "16px",
  display: "block",
};

export default function Predict() {
  const [ip, setIp] = useState("");
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    user_id: "",
    day_of_week: "",
    hour_of_day: "",
    device_type: "",
    network_type: "",
    youtube_hours: "",
    netflix_hours: "",
    gaming_hours: "",
    social_hours: "",
    subscription: "",
    age_group: "",
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    try {
      const res = await axios.post(
        "http://localhost:8000/predict_downloads",
        form
      );
      setPrediction(res.data.predicted_downloads_GB);
    } catch (err) {
      setPrediction({ error: "Prediction failed" });
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
        <LoadingUI name="Predict" />
      ) : (
        <div
          className="container_r"
          style={{
            maxWidth: "500px",
            height: "100%",
            margin: "0 auto",
            background: "#fff",
            padding: "32px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          }}
        >
          <h2 style={{ color: "#007bff", marginBottom: "24px" }}>
            Prediction Form
          </h2>
          {prediction && (
            <div
              style={{
                marginTop: "24px",
                fontSize: "17px",
                color: prediction.error ? "#dc3545" : "#28a745",
              }}
            >
              {prediction.error
                ? prediction.error
                : `Prediction: ${JSON.stringify(prediction)} GB`}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <input
              name="user_id"
              type="number"
              value={form.user_id}
              onChange={handleChange}
              placeholder="User ID"
              style={inputStyle}
              required
            />
            <input
              name="day_of_week"
              type="text"
              value={form.day_of_week}
              onChange={handleChange}
              placeholder="Day of Week"
              style={inputStyle}
              required
            />
            <input
              name="hour_of_day"
              type="number"
              value={form.hour_of_day}
              onChange={handleChange}
              placeholder="Hour of Day"
              style={inputStyle}
              required
            />
            <input
              name="device_type"
              type="text"
              value={form.device_type}
              onChange={handleChange}
              placeholder="Device Type"
              style={inputStyle}
              required
            />
            <input
              name="network_type"
              type="text"
              value={form.network_type}
              onChange={handleChange}
              placeholder="Network Type"
              style={inputStyle}
              required
            />
            <input
              name="youtube_hours"
              type="number"
              step="0.1"
              value={form.youtube_hours}
              onChange={handleChange}
              placeholder="YouTube Hours"
              style={inputStyle}
              required
            />
            <input
              name="netflix_hours"
              type="number"
              step="0.1"
              value={form.netflix_hours}
              onChange={handleChange}
              placeholder="Netflix Hours"
              style={inputStyle}
              required
            />
            <input
              name="gaming_hours"
              type="number"
              step="0.1"
              value={form.gaming_hours}
              onChange={handleChange}
              placeholder="Gaming Hours"
              style={inputStyle}
              required
            />
            <input
              name="social_hours"
              type="number"
              step="0.1"
              value={form.social_hours}
              onChange={handleChange}
              placeholder="Social Hours"
              style={inputStyle}
              required
            />
            <input
              name="subscription"
              type="text"
              value={form.subscription}
              onChange={handleChange}
              placeholder="Subscription"
              style={inputStyle}
              required
            />
            <input
              name="age_group"
              type="text"
              value={form.age_group}
              onChange={handleChange}
              placeholder="Age Group"
              style={inputStyle}
              required
            />
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                marginTop: "12px",
                width: "100%",
              }}
            >
              Get Prediction
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
