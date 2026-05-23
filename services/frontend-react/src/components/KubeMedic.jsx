import { useEffect, useState } from "react";

export default function KubeMedic() {

    const [pods, setPods] = useState([]);
    const [selectedPod, setSelectedPod] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const namespace = "default";

    // Fetch pods on load
    useEffect(() => {
        fetchPods();
    }, []);

    const fetchPods = async () => {
        try {
            const response = await fetch(
                `/api/pods?namespace=${namespace}`
            );
            const data = await response.json();
            setPods(data.pods || []);
        } catch (error) {
            console.error("Failed to fetch pods", error);
        }
    };

    const analyzePod = async () => {
        if (!selectedPod) return;
        try {
            setLoading(true);
            const response = await fetch(
                `/api/ai/kubemedic/pod-analysis?namespace=${namespace}&pod_name=${selectedPod}`
            );
            const data = await response.json();
            setResult(data.analysis);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getSeverityClass = (severity) => {
        const s = String(severity || "").toLowerCase();
        if (s.includes("high") || s.includes("critical") || s.includes("error")) {
            return "analysis-card--error";
        }
        if (s.includes("med") || s.includes("warn")) {
            return "analysis-card--warning";
        }
        return "analysis-card--cyan";
    };

    const getSeverityHeaderClass = (severity) => {
        const s = String(severity || "").toLowerCase();
        if (s.includes("high") || s.includes("critical") || s.includes("error")) {
            return "analysis-card__header--error";
        }
        if (s.includes("med") || s.includes("warn")) {
            return "analysis-card__header--warning";
        }
        return "analysis-card__header--cyan";
    };

    return (
        <div className="dashboard-section">
            <div className="section-header">
                <div className="section-header__tag">
                    <span>🤖</span>
                    <span>Kubernetes SRE Intel</span>
                </div>
                <h2 className="section-header__title">KubeMedic Diagnostics</h2>
                <p className="section-header__desc">
                    Examine live container event logs to automatically run root-cause analysis, assign severity levels, and fetch self-healing remedies.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="pod-select">Target Kubernetes Pod</label>
                <select
                    id="pod-select"
                    className="select-input"
                    value={selectedPod}
                    onChange={(e) => setSelectedPod(e.target.value)}
                >
                    <option value="">Choose a live cluster pod to diagnose...</option>
                    {pods.map((pod) => (
                        <option key={pod.name} value={pod.name}>
                            {pod.name} ({pod.status})
                        </option>
                    ))}
                </select>
            </div>

            <button
                className="btn-primary"
                onClick={analyzePod}
                disabled={loading || !selectedPod}
            >
                {loading ? (
                    <>
                        <span className="spinner" />
                        <span>Diagnosing logs...</span>
                    </>
                ) : (
                    <>
                        <span>⚡</span>
                        <span>Analyze Pod Logs</span>
                    </>
                )}
            </button>

            {result && (
                <div className="results-container">
                    <h3 className="results-title">
                        <span>🔍</span> Diagnosis Report — {selectedPod}
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

                        <div className={`analysis-card ${getSeverityClass(result.severity)}`}>
                            <div className={`analysis-card__header ${getSeverityHeaderClass(result.severity)}`}>
                                <span>⚠️</span> Severity Assessment
                            </div>
                            <div className="analysis-card__body">
                                This issue is classified as <strong>{result.severity || "unspecified"}</strong> severity.
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