import React, { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState("Loading...");
  const [dbStatus, setDbStatus] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8000/health")
      .then(res => res.json())
      .then(data => setHealth(data.status))
      .catch(() => setHealth("Error"));

    fetch("http://localhost:8000/db-check")
      .then(res => res.json())
      .then(data => setDbStatus(data.database_connection))
      .catch(() => setDbStatus("Error"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Autonomous DevOps Platform 🚀</h1>
      <h2>Backend Status: {health}</h2>
      <h2>Database Status: {dbStatus}</h2>
    </div>
  );
}

export default App;