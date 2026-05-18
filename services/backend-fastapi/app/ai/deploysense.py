from openai import OpenAI
import os
import json

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def analyze_deploy_logs(logs: str):

    try:
        trimmed_logs = logs[:3000]

        prompt = f"""
You are a senior DevOps engineer.

Analyze CI/CD failure logs.

Return ONLY valid JSON.
Do NOT add explanations.
Do NOT add markdown.
Do NOT add headings.

Strict JSON format:

{{
  "root_cause": "...",
  "failure_type": "...",
  "suggested_fix": "...",
  "prevention": "..."
}}

Failure types:
- build
- docker
- kubernetes
- network
- auth

Logs:
{trimmed_logs}
"""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Return ONLY valid JSON. No text."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )

        content = response.choices[0].message.content.strip()

        # Clean common LLM issues
        if content.startswith("```"):
            content = content.replace("```json", "").replace("```", "").strip()

        # Parse safely
        return json.loads(content)

    except Exception as e:

        return {
            "error": "Failed to parse AI response",
            "raw_output": content if 'content' in locals() else str(e)
        }