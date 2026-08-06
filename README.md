# 🚀 Autonomous DevOps & AI-Ops Platform

**A self-healing infrastructure platform that uses LLMs to diagnose and explain Kubernetes and CI/CD failures automatically — built and deployed solo, end-to-end, on real AWS infrastructure.**

> 📌 **What this is, in one line:** When a pod crashes or a deployment fails, most engineers spend 20-30 minutes digging through logs to find out why. This platform's AI layer reads the logs itself and tells you the root cause in seconds — cutting incident triage time by up to 80%.

## 🎥 Live Demos

**KubeMedic — AI Pod Diagnostics (live failure capture)**

https://github.com/user-attachments/assets/b75b4701-dbe0-4ae6-ae5a-1d1ce3d4ca10

**DeploySense — CI/CD Failure Root-Cause Analysis**

https://github.com/user-attachments/assets/7f71d570-469f-479f-9889-cdf9c446a2ef

**Full Platform Walkthrough**

https://github.com/user-attachments/assets/a68b7f83-c3f0-45b9-9a19-73b5ee7b73d1

---

## 🧠 Why This Project Stands Out

Most DevOps portfolio projects stop at "deployed an app with CI/CD." This one goes further — it adds an **AI Operations layer** that most engineers at any experience level haven't built:

- **KubeMedic** — Watches live Kubernetes pod logs and uses GPT-4o-mini to diagnose incidents (CrashLoopBackOff, OOMKilled, etc.) and suggest fixes — like having an SRE on call 24/7.
- **DeploySense** — Reads CI/CD pipeline failure logs and explains the root cause automatically, instead of a human scrolling through GitHub Actions logs manually.

This is the intersection of **traditional DevOps infrastructure** and **AI/LLM Operations** — a combination that's increasingly in demand and rare to see demonstrated end-to-end in a single project.

---

## 🛠️ Tech Stack & Integrations

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
<br/>
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
<br/>
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 📐 System Architecture

The platform evolved iteratively from a simple local multi-service application to a resilient, cloud-native, self-healing Kubernetes architecture with an AI diagnostics layer on top:

```
                  ┌─────────────────────────────────────┐
                  │          Developer Push             │
                  └──────────────────┬──────────────────┘
                                     │
                                     ▼
                  ┌─────────────────────────────────────┐
                  │    GitHub Actions (CI/CD)           │
                  └──────┬───────────────────────┬──────┘
                         │                       │
                         ▼                       ▼
            ┌────────────────────────┐  ┌────────────────────────┐
            │   Infrastructure IaC   │  │   Docker Hub Registry  │
            │      (Terraform)       │  │ (Docker Images Build)  │
            └────────────┬───────────┘  └────────────┬───────────┘
                         │                       │
                         │   Deploy / Rollout    │
                         ▼                       ▼
            ┌────────────────────────────────────────────────────┐
            │               Kubernetes (K3s) Cluster             │
            │                                                    │
            │  ┌───────────────────┐      ┌───────────────────┐  │
            │  │  React Frontend   ├─────►│  FastAPI Backend  │  │
            │  │  (Nginx-backed)   │      │ (Liveness/Readiness│ │
            │  └───────────────────┘      └──────────┬────────┘  │
            │                                        │           │
            │                                        ▼           │
            │                             ┌───────────────────┐  │
            │                             │    PostgreSQL     │  │
            │                             │    (Database)     │  │
            │                             └───────────────────┘  │
            └──────┬────────────────────────┬─────────────┬──────┘
                   │                        │             │
                   ▼                        ▼             ▼
        ┌─────────────────────┐  ┌─────────────────────┐┌─────────────────────┐
        │     KubeMedic       │  │     DeploySense     ││     Observability   │
        │(AI Pod Diagnostics) │  │(AI CI/CD Log Parser)││(Prometheus Monitor) │
        └─────────────────────┘  └─────────────────────┘└─────────────────────┘
```

> [!TIP]
> Read the complete stage-by-stage architecture detailing the transition from single-node instances to load-balanced Kubernetes deployments in the [Architecture Evolution Guide](docs/architecture.md).

---

## 📂 Platform Evolution & Stage Mappings

Detailed guides and implementation specifications for each development phase can be found below:

* **Foundations & setup**:
  * [Local Setup Guide](docs/setup-guide.md) — Comprehensive guide to launching the workspace locally.
  * [Architecture Evolution](docs/architecture.md) — Architectural patterns, microservice interaction, and system diagrams.
* **Evolution Stages**:
  * [Stage 1 — Microservices Setup](docs/stage-1-microservices.md) — Standard packaging and environment variables.
  * [Stage 2 — Orchestrated Platform](docs/stage-2-deployment.md) — Multi-service layout, health probes, NGINX routing, and Blue-Green traffic switching.
  * [Stage 3 — IaC (Infrastructure as Code)](docs/stage-3-infrastructure.md) — Provisioning AWS EC2 infrastructure with security groups using Terraform.
  * [Stage 4 — Cloud Kubernetes Orchestration](docs/stage-4-kubernetes.md) — High-availability deployment with ingress routing, liveness/readiness probes, and self-healing.
  * [Stage 5 — Metrics Observability](docs/stage-5-monitoring.md) — Prometheus metrics collection and dashboard metrics exporter configs.
  * [Stage 6 — Unified IaC & CI/CD](docs/stage-6-iac-integration.md) — End-to-end integration of Terraform provisioning with GitHub Actions workflows.
  * [Stage 7 — AI-Ops: KubeMedic](docs/stage-7-ai-kubemedic.md) — LLM-driven autonomous diagnostics and resolution recommendation engine for pod failures.
  * [Stage 8 — AI-Ops: DeploySense](docs/stage-8-ai-deploysense.md) — LLM-driven log analyzer scanning deployment logs to trace CI/CD bugs.

---

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- An OpenAI API Key (to leverage the KubeMedic & DeploySense AI diagnostic features)

### Local Startup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd autonomous-devops-platform
   ```

2. **Configure Environment Variables**
   Create a `.env` file inside the `docker` directory using the provided template:
   ```bash
   cp docker/.env.example docker/.env
   # Add your OpenAI API key and secrets inside docker/.env
   ```

3. **Launch the Platform**
   ```bash
   cd docker
   docker compose up --build
   ```

4. **Verify the Services**
   - React Dashboard UI: [http://localhost:3000](http://localhost:3000)
   - FastAPI Backend API: [http://localhost:8000](http://localhost:8000)
   - Backend Health Checks: [http://localhost:8000/health](http://localhost:8000/health)
   - Database Connectivity validation: [http://localhost:8000/db-check](http://localhost:8000/db-check)