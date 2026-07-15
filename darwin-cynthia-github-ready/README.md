# Darwin & Cynthia — Engagement Invitation

A cinematic, mobile-first engagement invitation for September 26th, 2026.

## Upload this project to GitHub

1. Sign in at https://github.com.
2. Click the **+** button at the top-right and select **New repository**.
3. Name it `darwin-cynthia-engagement`.
4. Select **Public** for a free repository, or **Private** if your Netlify plan supports private repository connections.
5. Do not add a README, `.gitignore`, or license—this folder already contains the project files.
6. Click **Create repository**.
7. On the empty repository page, select **uploading an existing file**.
8. Open this unzipped project folder and drag all its contents into GitHub. Include the hidden files `.gitignore` and `.nvmrc` if your computer shows them.
9. Enter `Initial engagement invitation` in the commit message and click **Commit changes**.

Important: upload the files *inside* this folder, not the outer folder itself. `package.json`, `app`, and `public` should appear at the top level of the GitHub repository.

## Publish it free with Netlify

1. Sign in at https://app.netlify.com.
2. Select **Add new project** → **Import an existing project**.
3. Choose **GitHub** and authorize Netlify when prompted.
4. Select the `darwin-cynthia-engagement` repository.
5. Netlify should read `netlify.toml` automatically. Confirm:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Select **Deploy**.
7. Wait for the deployment to finish, then open the generated `netlify.app` URL.

Future GitHub changes to the main branch will automatically redeploy the site.

## Change the free Netlify address

In Netlify, open **Project configuration** → **General** → **Project details**, then change the project name. The free address becomes `your-project-name.netlify.app` if available.

## Edit invitation details

Open `app/page.tsx`. The `INVITE` object near the top contains the couple name, date, countdown date, times, venues, addresses, and map links.

Images, music, and ring models are in `public/assets`. Keep replacement filenames the same, or update their paths in `app/page.tsx`.

## Run locally (optional)

Install Node.js 22, then run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.
