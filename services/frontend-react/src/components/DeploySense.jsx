import { useState } from "react";

export default function DeploySense() {

  const [logs, setLogs] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeLogs = async () => {

    if (!logs) return;

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/ai/deploysense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ logs }),
        }
      );

      if (!response.ok) {
        console.error("API error:", response.status);
        return;
      }

      const data = await response.json();

      setResult(data);

    } catch (err) {

      console.error("Fetch error:", err);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div style={{ marginTop: "60px" }}>

      <h1>🚀 DeploySense</h1>

      <textarea
        rows="10"
        placeholder="Paste CI/CD logs here..."
        value={logs}
        onChange={(e) => setLogs(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={analyzeLogs}>
        {loading ? "Analyzing..." : "Analyze Logs"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>

          <h3>Root Cause</h3>
          <p>{result.root_cause}</p>

          <h3>Failure Type</h3>
          <p>{result.failure_type}</p>

          <h3>Suggested Fix</h3>
          <p>{result.suggested_fix}</p>

          <h3>Prevention</h3>
          <p>{result.prevention}</p>

        </div>
      )}

    </div>
  );
}