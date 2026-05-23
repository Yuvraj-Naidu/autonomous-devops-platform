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
        "/api/ai/deploysense",
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

  const getFailureTypeClass = (type) => {
    const t = String(type || "").toLowerCase();
    if (t.includes("build")) return "analysis-card--warning";
    if (t.includes("docker")) return "analysis-card--info";
    if (t.includes("kube")) return "analysis-card--cyan";
    if (t.includes("network") || t.includes("auth")) return "analysis-card--error";
    return "analysis-card--info";
  };

  const getFailureHeaderClass = (type) => {
    const t = String(type || "").toLowerCase();
    if (t.includes("build")) return "analysis-card__header--warning";
    if (t.includes("docker")) return "analysis-card__header--info";
    if (t.includes("kube")) return "analysis-card__header--cyan";
    if (t.includes("network") || t.includes("auth")) return "analysis-card__header--error";
    return "analysis-card__header--info";
  };

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <div className="section-header__tag">
          <span>⚡</span>
          <span>CI/CD SRE Diagnostic</span>
        </div>
        <h2 className="section-header__title">DeploySense Analyzer</h2>
        <p className="section-header__desc">
          Paste error logs from your build runner (Docker compilation, test stages, or deployment runs) to isolate failure modes and generate a step-by-step remediation plan.
        </p>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="log-textarea">Pipeline Console Logs</label>
        <textarea
          id="log-textarea"
          className="textarea-input"
          rows="10"
          placeholder="Paste console build failure logs here..."
          value={logs}
          onChange={(e) => setLogs(e.target.value)}
        />
      </div>

      <button
        className="btn-primary"
        onClick={analyzeLogs}
        disabled={loading || !logs}
      >
        {loading ? (
          <>
            <span className="spinner" />
            <span>Analyzing logs...</span>
          </>
        ) : (
          <>
            <span>⚡</span>
            <span>Analyze Console Logs</span>
          </>
        )}
      </button>

      {result && (
        <div className="results-container">
          <h3 className="results-title">
            <span>🔍</span> DeploySense Diagnostic Report
          </h3>

          <div className="results-grid">
            <div className="analysis-card analysis-card--error">
              <div className="analysis-card__header analysis-card__header--error">
                <span>🚨</span> Root Cause
              </div>
              <div className="analysis-card__body">
                {result.root_cause}
              </div>
            </div>

            <div className={`analysis-card ${getFailureTypeClass(result.failure_type)}`}>
              <div className={`analysis-card__header ${getFailureHeaderClass(result.failure_type)}`}>
                <span>⚠️</span> Failure Domain
              </div>
              <div className="analysis-card__body">
                Identified failure type: <strong>{result.failure_type || "unspecified"}</strong>.
              </div>
            </div>

            <div className="analysis-card analysis-card--success">
              <div className="analysis-card__header analysis-card__header--success">
                <span>✅</span> Suggested Fix
              </div>
              <div className="analysis-card__body">
                {result.suggested_fix}
              </div>
            </div>

            <div className="analysis-card analysis-card--info">
              <div className="analysis-card__header analysis-card__header--info">
                <span>🛡️</span> Prevention Strategy
              </div>
              <div className="analysis-card__body">
                {result.prevention}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}