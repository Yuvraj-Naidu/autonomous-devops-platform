from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.kubemedic import analyze_k8s_logs
from app.kubernetes.pod_logs import get_pod_logs
from app.kubernetes.pods import list_pods

router = APIRouter()


class LogRequest(BaseModel):
    logs: str


@router.post("/ai/kubemedic")
def kubemedic(request: LogRequest):

    result = analyze_k8s_logs(request.logs)

    return result


@router.get("/pods/logs")
def pod_logs(namespace: str, pod_name: str):

    logs = get_pod_logs(namespace, pod_name)

    return {"logs": logs}


@router.get("/ai/kubemedic/pod-analysis")
def analyze_pod(namespace: str, pod_name: str):

    logs = get_pod_logs(namespace, pod_name)

    result = analyze_k8s_logs(logs)

    return {"pod_name": pod_name, "namespace": namespace, "analysis": result}


@router.get("/pods")
def get_pods(namespace: str = "default"):

    pods = list_pods(namespace)

    return {"pods": pods}
