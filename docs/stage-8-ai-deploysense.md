## DeploySense (AI-Powered CI/CD Failure Analyzer)

DeploySense is an AI-driven module that analyzes CI/CD pipeline logs and provides structured debugging insights.

### Components:
- React UI for log input
- FastAPI backend endpoint (/api/ai/deploysense)
- OpenAI GPT-4o-mini for analysis
- Kubernetes deployment with environment-based configuration

### Capabilities:
- Accept raw CI/CD logs
- Analyze failures using AI
- Return structured insights:
  - root_cause
  - failure_type
  - suggested_fix
  - prevention

### Workflow:
User → Paste Logs → API Request → AI Analysis → Structured Response → UI Display

### Challenges:
- Frontend-backend routing issues in local vs production environments
- Unstructured AI responses causing parsing failures
- React state handling and rendering issues
- Kubernetes CrashLoopBackOff due to missing API key
- Ensuring consistent API communication through ingress

### Fixes:
- Standardized API calls using `/api/*` routing
- Enforced strict JSON prompt structure for AI responses
- Added backend-side parsing safeguards
- Configured Kubernetes Secret for OPENAI_API_KEY
- Validated deployment using kubectl logs and rollout checks

### Outcome:
- Fully functional CI/CD failure analysis tool
- Stable AI integration with structured outputs
- Production-ready deployment with Kubernetes