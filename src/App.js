import React from "react";
import LiveTraffic from "./components/LiveTraffic";
import Alerts from "./components/Alerts";
import Reports from "./components/Reports";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HistoricalTraffic from "./components/HistoricalTraffic";
import Devices from "./components/Devices";
import Predict from "./components/Predict";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LiveTraffic />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/history" element={<HistoricalTraffic />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/predict" element={<Predict />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
