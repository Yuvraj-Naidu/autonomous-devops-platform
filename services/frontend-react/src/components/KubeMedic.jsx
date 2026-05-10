import { useEffect, useState } from "react";

export default function KubeMedic() {

    const [pods, setPods] = useState([]);
    const [selectedPod, setSelectedPod] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const namespace = "default";

    const cardStyle = {
        background: "#111827",
        padding: "20px",
        borderRadius: "14px",
        marginBottom: "20px",
        border: "1px solid rgba(255,255,255,0.08)",
    };

    // Fetch pods on load
    useEffect(() => {

        fetchPods();

    }, []);

    const fetchPods = async () => {

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/pods?namespace=${namespace}`
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
                `http://127.0.0.1:8000/ai/kubemedic/pod-analysis?namespace=${namespace}&pod_name=${selectedPod}`
            );

            const data = await response.json();

            setResult(data.analysis);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div
            style={{
                background: "rgba(20, 20, 40, 0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "30px",
                backdropFilter: "blur(10px)",
            }}
        >
            <h1 style={{ marginBottom: "20px" }}>
                🤖 KubeMedic
            </h1>

            <select
                value={selectedPod}
                onChange={(e) => setSelectedPod(e.target.value)}
                style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    background: "#0f172a",
                    color: "white",
                    border: "1px solid #334155",
                }}
            >
                <option value="">
                    Select Kubernetes Pod
                </option>

                {pods.map((pod) => (
                    <option
                        key={pod.name}
                        value={pod.name}
                    >
                        {pod.name} ({pod.status})
                    </option>
                ))}
            </select>

            <button
                onClick={analyzePod}
                disabled={loading}
                style={{
                    background: "#6366f1",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                }}
            >
                {loading ? "Analyzing..." : "Analyze Pod"}
            </button>

            {result && (
                <div style={{ marginTop: "30px" }}>

                    <div style={cardStyle}>
                        <h2>Root Cause</h2>
                        <p>{result.root_cause}</p>
                    </div>

                    <div style={cardStyle}>
                        <h2>Severity</h2>
                        <p>{result.severity}</p>
                    </div>

                    <div style={cardStyle}>
                        <h2>Suggested Fix</h2>
                        <p>{result.suggested_fix}</p>
                    </div>

                    <div style={cardStyle}>
                        <h2>Prevention</h2>
                        <p>{result.prevention}</p>
                    </div>

                </div>
            )}
        </div>
    );
}