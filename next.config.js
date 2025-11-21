const withMarkdoc = require('@markdoc/next.js');

// Use basePath only in production (GitHub Pages)
// In development, no basePath so you can test at localhost:3000/
const basePath = process.env.NODE_ENV === 'production' ? '/phishfort-handbook' : '';

module.exports = withMarkdoc()({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
  output: 'export',
  basePath: basePath,
  images: {
    unoptimized: true
  },
});
