from kubernetes import client, config


def get_pod_logs(namespace: str, pod_name: str):

    try:

        # Load kubeconfig
        config.load_kube_config()

        v1 = client.CoreV1Api()

        logs = v1.read_namespaced_pod_log(
            name=pod_name,
            namespace=namespace,
            tail_lines=100
        )

        return logs

    except Exception as e:

        return f"Failed to fetch logs: {str(e)}"