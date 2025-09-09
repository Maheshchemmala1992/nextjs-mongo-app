# Next.js + MongoDB (AWS EC2 & Azure App Service)

- API: `/api/topics` (GET, POST)
- DB: `nextjsdb.topics`
- Env var: `MONGODB_URI`

## Deploy to AWS EC2 (GitHub Actions)
1) Add GitHub repo secrets: `EC2_HOST`, `EC2_USER` (e.g. ubuntu), `EC2_SSH_KEY` (PEM), `MONGODB_URI`.
2) Ensure EC2 has Node 18+, git, pm2 installed.
3) Push to `main` -> auto deploy.

## Deploy to Azure App Service (GitHub Actions)
1) In Azure App Service -> Configuration -> add `MONGODB_URI`.
2) In GitHub -> Secrets -> add `AZURE_WEBAPP_PUBLISH_PROFILE` and `AZURE_WEBAPP_NAME`.
3) Push to `main` -> auto deploy.
