## Monitoring Setup

Implemented lightweight monitoring using Prometheus.

### Setup:
- Deployed Prometheus as a standalone pod
- Accessed via port-forward and SSH tunnel

### Reason:
Full monitoring stack was resource-heavy for small EC2 instance

### Outcome:
- Metrics collection working
- Prometheus UI accessible
- Basic observability achieved