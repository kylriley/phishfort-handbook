# Deployment to GitHub Pages

This site is configured to deploy automatically to GitHub Pages using GitHub Actions.

## Setup Instructions

### 1. Push to GitHub

If you haven't already, push this repository to GitHub:

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
4. Save the settings

### 3. Automatic Deployment

Once configured, the site will automatically deploy whenever you push to the `main` branch.

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
- Build the static site
- Deploy to GitHub Pages
- Make it available at: `https://<username>.github.io/<repository-name>/`

### 4. Custom Domain (Optional)

If you want to use a custom domain:

1. Go to **Settings** → **Pages**
2. Enter your custom domain
3. Follow GitHub's instructions for DNS configuration

## Repository vs User/Organization Site

### Repository Site (e.g., username.github.io/repo-name)

If deploying to a repository site, uncomment and update the `basePath` in `next.config.js`:

```javascript
basePath: '/your-repo-name',
```

### User/Organization Site (e.g., username.github.io)

If the repository is named `<username>.github.io`, no `basePath` is needed.

## Manual Build

To build the site locally:

```bash
npm run build
```

The static files will be generated in the `out/` directory.

## Troubleshooting

### Build Fails

- Check the Actions tab in GitHub for error logs
- Ensure all dependencies are in `package.json`
- Test the build locally with `npm run build`

### 404 on Deployment

- Verify GitHub Pages is set to use "GitHub Actions" as the source
- Check that the workflow completed successfully
- If using a repository site, ensure `basePath` is set correctly

### Links Not Working

- If deploying to a repository site (not username.github.io), make sure to set the `basePath` in `next.config.js`
- Verify all internal links use relative paths or Next.js Link component
