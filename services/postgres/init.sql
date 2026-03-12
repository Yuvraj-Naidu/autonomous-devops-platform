CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE deployments (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(100),
    version VARCHAR(50),
    deployed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_health (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(100),
    status VARCHAR(50),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);