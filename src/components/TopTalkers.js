import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TopTalkers() {
  const [talkers, setTalkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/top-talkers");
      setTalkers(result.data);
    };
    // fetchData();
    const interval = setInterval(fetchData, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Top Talkers</h2>
      <ul>
        {talkers &&
          talkers.length > 0 &&
          talkers.map((talker, index) => (
            <li key={index}>
              {talker.ip} - {talker.usage_bytes} Bytes
            </li>
          ))}
      </ul>
    </div>
  );
}
