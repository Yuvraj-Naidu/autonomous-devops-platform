FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN apt-get update && apt-get install -y curl \
    && curl -LO "https://dl.k8s.io/release/v1.35.1/bin/linux/amd64/kubectl" \
    && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]