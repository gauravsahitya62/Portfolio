# Deploying the portfolio

## Backend (Spring Boot) – Render (free tier)

1. **Push your code** (including `render.yaml` and backend `application.yml` with `PORT` support).
2. Go to **https://dashboard.render.com** and sign in (GitHub is fine).
3. Click **New +** → **Web Service**.
4. Connect the **gauravsahitya62/Portfolio** repo (or your fork).
5. Render should detect `render.yaml`. If it does, use the blueprint. Otherwise set:
   - **Root Directory:** `backend`
   - **Build Command:** `mvn clean package -DskipTests`
   - **Start Command:** `java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar`
6. Click **Create Web Service**. Wait for the first deploy to finish.
7. Copy your backend URL, e.g. `https://portfolio-backend-xxxx.onrender.com`.

## Point the frontend at the deployed backend

1. In the **frontend** folder, build and deploy with the API URL:
   ```bash
   cd frontend
   set VITE_API_BASE=https://YOUR-BACKEND-URL.onrender.com/api
   npm run build
   npx gh-pages -d dist
   ```
   On Mac/Linux use `export VITE_API_BASE=...` instead of `set`.
2. Or add a `.env.production` in `frontend/` with:
   ```
   VITE_API_BASE=https://YOUR-BACKEND-URL.onrender.com/api
   ```
   Then run `npm run deploy` from `frontend/`.

After that, the live site at **https://gauravsahitya62.github.io/Portfolio/** will use the deployed backend (about, links, admin login, photo upload).  
**Note:** Render free tier spins down after ~15 min idle; the first request may take 30–60 seconds to wake the backend.
