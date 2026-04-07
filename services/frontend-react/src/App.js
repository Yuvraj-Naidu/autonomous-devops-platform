import React, { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState("Loading...");
  const [dbStatus, setDbStatus] = useState("Loading...");

  useEffect(() => {
    fetch("/api/health")
      .then(res => res.json())
      .then(data => setHealth(data.status))
      .catch(() => setHealth("Error"));

    fetch("/api/db-check")
      .then(res => res.json())
      .then(data => setDbStatus(data.database_connection))
      .catch(() => setDbStatus("Error"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Autonomous DevOps Platform 🚀</h1>
      <h1>Version 2 - Deployment Test</h1>
      <h2>Backend Status: {health}</h2>
      <h2>Database Status: {dbStatus}</h2>
      <h3>Frontend Healthy</h3>
    </div>
  );
}

export default App;
