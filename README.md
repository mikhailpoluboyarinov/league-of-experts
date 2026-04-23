## About project

> This project was created for the sofa league of football experts. 
  In order to gather a small company every two years and have fun watching 
  the World Cup or the European Football championship. 
  And of course the most important thing is to identify the strongest football
  forecaster).

## Frontend (Vite)

- Install dependencies: `npm install`
- Start dev server: `npm start`
- Build: `npm run build`

API host is configured via env var:

- `VITE_API_HOST` (example in `.env.example`)

## Docker stack (frontend + backend + mysql)

1. Copy env file:
   - `cp infra/.env.example infra/.env`
2. Put DB dump into:
   - `infra/db/init/default_db.sql`
3. Run:
   - `docker compose --env-file infra/.env -f infra/docker-compose.yml up -d --build`
4. Open:
   - `http://localhost:18080`

Stop stack:

- `docker compose --env-file infra/.env -f infra/docker-compose.yml down`

## Production on VPS (HTTPS + domain)

### 1) Prepare server

- Install Docker + Docker Compose plugin
- Open ports `80` and `443` in VPS firewall
- Point DNS `A` record of your domain to VPS public IP

### 2) Prepare production env

1. Copy env template:
   - `cp infra/.env.prod.example infra/.env.prod`
2. Set real values in `infra/.env.prod`:
   - `DOMAIN` (e.g. `loe.example.com`)
   - `ACME_EMAIL` (for Let's Encrypt notifications)
   - strong MySQL passwords
3. Put DB dump (first launch only):
   - `infra/db/init/default_db.sql`

### 3) Start production stack

- `docker compose --env-file infra/.env.prod -f infra/docker-compose.prod.yml up -d --build`

Services:
- HTTPS reverse proxy: Caddy (auto TLS/Let's Encrypt)
- Frontend: Vite build + Nginx (internal)
- Backend: Node/Express (internal)
- DB: MySQL 8 with persistent volume

### 4) Verify

- `https://YOUR_DOMAIN/`
- `https://YOUR_DOMAIN/api/users`

### 5) Update on server

- `git pull`
- `docker compose --env-file infra/.env.prod -f infra/docker-compose.prod.yml up -d --build`

### 6) Stop production stack

- `docker compose --env-file infra/.env.prod -f infra/docker-compose.prod.yml down`
