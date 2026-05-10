from kubernetes import client, config


def list_pods(namespace: str = "default"):

    try:

        config.load_kube_config()

        v1 = client.CoreV1Api()

        pods = v1.list_namespaced_pod(namespace)

        pod_list = []

        for pod in pods.items:

            pod_list.append({"name": pod.metadata.name, "status": pod.status.phase})

        return pod_list

    except Exception as e:

        return {"error": str(e)}
