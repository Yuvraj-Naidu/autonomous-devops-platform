import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [health, setHealth] = useState("Loading...");
  const [dbStatus, setDbStatus] = useState("Loading...");
  const [lastChecked, setLastChecked] = useState(null);

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
            <span className="top-bar__badge">v4</span>
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

        {/* Version Banner */}
        <div className="version-banner">
          <div className="version-banner__tag">
            <span>🎯</span>
            <span>Latest Release</span>
          </div>
          <h2 className="version-banner__title">
            Version 4 — Auto Switch Final Fix
          </h2>
          <p className="version-banner__desc">
            Deployment test verified • CI/CD pipeline green • All services
            healthy
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
