import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import KubeMedic from "./components/KubeMedic";
import DeploySense from "./components/DeploySense";
import EvolutionTimeline from "./components/EvolutionTimeline";

function App() {
  const [health, setHealth] = useState("Loading...");
  const [dbStatus, setDbStatus] = useState("Loading...");
  const [lastChecked, setLastChecked] = useState(null);
  const [version, setVersion] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Refs for scroll-into-view
  const toolsSectionRef = useRef(null);

  useEffect(() => {
    fetch("/api/health")
      .then(res => res.json())
      .then(data => {
        setHealth(data.status);
        setLastChecked(new Date().toLocaleTimeString());
      })
      .catch(() => setHealth("Error"));

    fetch("/api/db-check")
      .then(res => res.json())
      .then(data => setDbStatus(data.database_connection))
      .catch(() => setDbStatus("Error"));

    fetch("/api/version")
      .then(res => res.json())
      .then(data => setVersion(data.version));
  }, []);

  const getStatusClass = (status) => {
    if (status === "Loading...") return "status-card__value--loading";
    if (status === "Error") return "status-card__value--error";
    return "status-card__value--healthy";
  };

  const getDotClass = (status) => {
    if (status === "Loading...") return "status-card__dot--amber";
    if (status === "Error") return "status-card__dot--red";
    return "status-card__dot--green";
  };

  const getDisplayStatus = (status) => {
    if (status === "Loading...") return "Checking…";
    if (status === "Error") return "Offline";
    return "Operational";
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== "overview" && toolsSectionRef.current) {
      toolsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="app-container">
      {/* Animated background elements */}
      <div className="bg-orb bg-orb--1" />
      <div className="bg-orb bg-orb--2" />
      <div className="bg-orb bg-orb--3" />
      <div className="grid-overlay" />

      <div className="content-wrapper">
        {/* Top Navigation Bar */}
        <nav className="top-bar">
          <div className="top-bar__brand">
            <div className="top-bar__logo">🚀</div>
            <span className="top-bar__title">DevOps Platform</span>
            <span className="top-bar__badge">{version}</span>
          </div>
          <div className="top-bar__nav">
            <button
              className={`nav-tab ${activeTab === "overview" ? "nav-tab--active" : ""}`}
              onClick={() => handleTabClick("overview")}
            >
              <span className="nav-tab__icon">📊</span>
              <span>Overview</span>
            </button>
            <button
              className={`nav-tab ${activeTab === "kubemedic" ? "nav-tab--active nav-tab--medic" : ""}`}
              onClick={() => handleTabClick("kubemedic")}
            >
              <span className="nav-tab__icon">🤖</span>
              <span>KubeMedic</span>
            </button>
            <button
              className={`nav-tab ${activeTab === "deploysense" ? "nav-tab--active nav-tab--deploy" : ""}`}
              onClick={() => handleTabClick("deploysense")}
            >
              <span className="nav-tab__icon">⚡</span>
              <span>DeploySense</span>
            </button>
          </div>
          <div className="top-bar__status">
            <span className="top-bar__dot" />
            <span>System Online</span>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero__eyebrow">
            <span>⚡</span>
            <span>Autonomous Infrastructure</span>
          </div>
          <h1 className="hero__title">Autonomous DevOps Platform</h1>
          <p className="hero__subtitle">
            Real-time monitoring & orchestration for your entire infrastructure
            stack — all in one place.
          </p>
        </section>

        {/* Status Cards Grid */}
        <div className="status-grid">
          {/* Backend Status Card */}
          <div className="status-card">
            <div className="status-card__header">
              <div className="status-card__icon-wrapper status-card__icon-wrapper--backend">
                ⚙️
              </div>
            </div>
            <div className="status-card__label">Backend API</div>
            <div className={`status-card__value ${getStatusClass(health)}`}>
              {getDisplayStatus(health)}
            </div>
            <div className="status-card__meta">
              <span className={`status-card__dot ${getDotClass(health)}`} />
              <span>/api/health → {health}</span>
            </div>
          </div>

          {/* Database Status Card */}
          <div className="status-card">
            <div className="status-card__header">
              <div className="status-card__icon-wrapper status-card__icon-wrapper--database">
                🗄️
              </div>
            </div>
            <div className="status-card__label">Database</div>
            <div className={`status-card__value ${getStatusClass(dbStatus)}`}>
              {getDisplayStatus(dbStatus)}
            </div>
            <div className="status-card__meta">
              <span className={`status-card__dot ${getDotClass(dbStatus)}`} />
              <span>/api/db-check → {dbStatus}</span>
            </div>
          </div>

          {/* Frontend Status Card */}
          <div className="status-card">
            <div className="status-card__header">
              <div className="status-card__icon-wrapper status-card__icon-wrapper--frontend">
                🌐
              </div>
            </div>
            <div className="status-card__label">Frontend</div>
            <div className="status-card__value status-card__value--healthy">
              Operational
            </div>
            <div className="status-card__meta">
              <span className="status-card__dot status-card__dot--green" />
              <span>React SPA • {lastChecked || "syncing..."}</span>
            </div>
          </div>
        </div>

        {/* Evolution Timeline */}
        <EvolutionTimeline />

        {/* Tools Section with Tabs */}
        <div ref={toolsSectionRef} className="tools-section">
          <div className="tools-section__header">
            <h2 className="tools-section__title">AI-Powered Tools</h2>
            <p className="tools-section__desc">
              Select a tool below to interact with your infrastructure
            </p>
          </div>

          {/* Tool Selector Cards */}
          <div className="tool-selector">
            <button
              className={`tool-card ${activeTab === "kubemedic" ? "tool-card--active tool-card--medic" : ""}`}
              onClick={() => setActiveTab("kubemedic")}
            >
              <div className="tool-card__glow" />
              <div className="tool-card__icon">🤖</div>
              <div className="tool-card__content">
                <h3 className="tool-card__name">KubeMedic</h3>
                <p className="tool-card__desc">Pod diagnostics & root-cause analysis</p>
              </div>
              <div className="tool-card__arrow">→</div>
            </button>
            <button
              className={`tool-card ${activeTab === "deploysense" ? "tool-card--active tool-card--deploy" : ""}`}
              onClick={() => setActiveTab("deploysense")}
            >
              <div className="tool-card__glow" />
              <div className="tool-card__icon">⚡</div>
              <div className="tool-card__content">
                <h3 className="tool-card__name">DeploySense</h3>
                <p className="tool-card__desc">CI/CD log analysis & failure detection</p>
              </div>
              <div className="tool-card__arrow">→</div>
            </button>
          </div>

          {/* Tool Content Area */}
          <div className="tool-content">
            {activeTab === "kubemedic" && <KubeMedic />}
            {activeTab === "deploysense" && <DeploySense />}
            {activeTab === "overview" && (
              <div className="tool-placeholder">
                <div className="tool-placeholder__icon">🛠️</div>
                <h3 className="tool-placeholder__title">Select a Tool</h3>
                <p className="tool-placeholder__desc">
                  Choose KubeMedic or DeploySense above to start analyzing your infrastructure.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Version Banner */}
        <div className="version-banner">
          <div className="version-banner__tag">
            <span>🎯</span>
            <span>Latest Release</span>
          </div>
          <h2 className="version-banner__title">
            Version {version} — Production-Ready DevOps Platform
          </h2>
          <p className="version-banner__desc">
            CI/CD automated • Zero-downtime deploy • Kubernetes orchestration • Ingress routing • Fully operational
          </p>
        </div>

        {/* Footer */}
        <footer className="app-footer">
          <p className="app-footer__text">
            Built with{" "}
            <span className="app-footer__gradient">Autonomous DevOps</span> •
            Real-time infrastructure monitoring
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;