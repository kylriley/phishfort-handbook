const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc()({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
  output: 'export',
  images: {
    unoptimized: true
  },
  // If deploying to a repository (e.g., username.github.io/repo-name),
  // uncomment and set the basePath:
  basePath: '/phishfort-handbook',
});
