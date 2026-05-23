import React, { useEffect, useState } from "react";
import "./EvolutionTimeline.css";
import {
  SiDocker,
  SiTerraform,
  SiKubernetes,
  SiPrometheus,
  SiGithubactions,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const stages = [
  {
    id: 1,
    title: "Microservices",
    desc: "Docker Compose local dev with FastAPI + React + PostgreSQL",
    icon: <SiDocker />,
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "EC2 Deploy",
    desc: "GitHub Actions CI/CD pipeline deploying to AWS EC2",
    icon: <FaAws />,
    color: "#8b5cf6",
  },
  {
    id: 3,
    title: "Terraform IaC",
    desc: "Infrastructure-as-Code: VPC, subnets, RDS, security groups",
    icon: <SiTerraform />,
    color: "#7c3aed",
  },
  {
    id: 4,
    title: "Kubernetes",
    desc: "K3s cluster with Ingress, RBAC, probes & rolling updates",
    icon: <SiKubernetes />,
    color: "#6366f1",
  },
  {
    id: 5,
    title: "Monitoring",
    desc: "Prometheus metrics + Grafana dashboards + node-exporter",
    icon: <SiPrometheus />,
    color: "#22d3ee",
  },
  {
    id: 6,
    title: "Full CI/CD",
    desc: "End-to-end: build → push → deploy → rollout pipeline",
    icon: <SiGithubactions />,
    color: "#10b981",
  },
  {
    id: 7,
    title: "KubeMedic AI",
    desc: "LLM-powered pod diagnostics & root-cause analysis",
    icon: "🤖",
    color: "#06b6d4",
  },
  {
    id: 8,
    title: "DeploySense AI",
    desc: "AI analysis of deployment & build failure logs",
    icon: "⚡",
    color: "#f59e0b",
  },
];

export default function EvolutionTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % stages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="evo"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="evo__header">
        <div className="evo__tag">
          <span>🧬</span>
          <span>8 Stages of Evolution</span>
        </div>
        <h2 className="evo__title">Platform Evolution</h2>
        <p className="evo__subtitle">
          From a local Docker setup to a full AI-powered DevOps platform
        </p>
      </div>

      {/* Timeline track */}
      <div className="evo__track">
        {/* Connecting line */}
        <div className="evo__line">
          <div
            className="evo__line-fill"
            style={{ width: `${(activeIdx / (stages.length - 1)) * 100}%` }}
          />
        </div>

        {/* Stage nodes */}
        <div className="evo__nodes">
          {stages.map((stage, idx) => (
            <button
              key={stage.id}
              className={`evo__node ${idx <= activeIdx ? "evo__node--reached" : ""} ${idx === activeIdx ? "evo__node--active" : ""}`}
              onClick={() => setActiveIdx(idx)}
              style={{
                "--node-color": stage.color,
              }}
            >
              <div className="evo__node-dot">
                <span className="evo__node-icon">{stage.icon}</span>
              </div>
              <span className="evo__node-label">
                {stage.id}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active stage detail card */}
      <div className="evo__detail" key={activeIdx} style={{ "--node-color": stages[activeIdx].color }}>
        <div
          className="evo__detail-accent"
          style={{ background: "var(--node-color)" }}
        />
        <div className="evo__detail-content">
          <div className="evo__detail-number" style={{ color: "var(--node-color)" }}>
            Stage {stages[activeIdx].id}
          </div>
          <h3 className="evo__detail-title">{stages[activeIdx].title}</h3>
          <p className="evo__detail-desc">{stages[activeIdx].desc}</p>
        </div>
        <div className="evo__detail-icon">{stages[activeIdx].icon}</div>
      </div>

      {/* Stage indicator dots */}
      <div className="evo__dots">
        {stages.map((_, idx) => (
          <button
            key={idx}
            className={`evo__dot ${idx === activeIdx ? "evo__dot--active" : ""}`}
            onClick={() => setActiveIdx(idx)}
            style={{
              "--dot-color": stages[idx].color,
            }}
          />
        ))}
      </div>
    </section>
  );
}
