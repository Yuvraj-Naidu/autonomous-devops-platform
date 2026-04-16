up:
	cd docker && docker compose up --build -d

down:
	cd docker && docker compose down

logs:
	cd docker && docker compose logs -f

logs-backend:
	cd docker && docker compose logs -f backend_v1

logs-frontend:
	cd docker && docker compose logs -f frontend_v1

ps:
	cd docker && docker ps

restart:
	cd docker && docker compose down && docker compose up --build -d
