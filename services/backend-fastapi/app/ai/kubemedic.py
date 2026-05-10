from openai import OpenAI
import os
import json

from app.ai.prompts import KUBERNETES_TROUBLESHOOT_PROMPT


def analyze_k8s_logs(logs: str):

    try:

        client = OpenAI(
            api_key=os.getenv("OPENAI_API_KEY")
        )

        trimmed_logs = logs[:3000]

        prompt = KUBERNETES_TROUBLESHOOT_PROMPT.format(
            logs=trimmed_logs
        )

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2
        )

        content = response.choices[0].message.content

        return json.loads(content)

    except Exception as e:

        return {
            "error": str(e)
        }