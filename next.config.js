const withMarkdoc = require('@markdoc/next.js');

// Use basePath only when deploying to GitHub Pages
// GITHUB_ACTIONS is automatically set to 'true' in GitHub Actions workflows
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGitHubPages ? '/phishfort-handbook' : '';

module.exports = withMarkdoc()({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
  output: 'export',
  basePath: basePath,
  images: {
    unoptimized: true
  },
});
