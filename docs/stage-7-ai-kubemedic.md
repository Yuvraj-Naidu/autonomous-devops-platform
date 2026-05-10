## KubeMedic — AI-assisted Kubernetes Troubleshooting

KubeMedic analyzes Kubernetes pod logs using an LLM to provide:

- Root cause analysis
- Suggested fixes
- Prevention insights

### Flow:
Pod → Logs → FastAPI → LLM → Diagnosis

### Key Value:
- Reduces debugging effort
- Speeds up incident resolution
- Adds AI-assisted observability

### Design Decision:
Focused on AI-assisted insights rather than automated remediation to maintain system safety.