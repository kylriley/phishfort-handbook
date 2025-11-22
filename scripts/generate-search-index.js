const fs = require('fs');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');

function getAllMarkdownFiles(dir, baseDir = dir) {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath, baseDir));
    } else if (item.endsWith('.md') || item.endsWith('.mdoc')) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractTextFromMarkdoc(source) {
  const ast = Markdoc.parse(source);

  function extractText(node) {
    if (typeof node === 'string') {
      return node;
    }

    if (!node) {
      return '';
    }

    if (node.type === 'text') {
      return node.attributes?.content || '';
    }

    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractText).join(' ');
    }

    return '';
  }

  return extractText(ast).replace(/\s+/g, ' ').trim();
}

function generateSearchIndex() {
  const docsDir = path.join(process.cwd(), 'docs');
  const markdownFiles = getAllMarkdownFiles(docsDir);

  const searchDocuments = [];

  for (const filePath of markdownFiles) {
    const source = fs.readFileSync(filePath, 'utf-8');

    // Parse frontmatter
    const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---/);
    let title = '';

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const titleMatch = frontmatter.match(/title:\s*(.+)/);
      if (titleMatch) {
        title = titleMatch[1].replace(/['"]/g, '').trim();
      }
    }

    // Generate href from file path
    const relativePath = path.relative(docsDir, filePath);
    let href = '/' + relativePath
      .replace(/\\/g, '/')
      .replace(/\.(md|mdoc)$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '');

    // Extract text content
    const markdownContent = source.replace(/^---[\s\S]*?---/, '').trim();
    const text = extractTextFromMarkdoc(markdownContent);

    // Create excerpt (first 200 characters)
    const excerpt = text.substring(0, 200) + (text.length > 200 ? '...' : '');

    // Include more content for search (first 2000 characters)
    const searchContent = text.substring(0, 2000);

    searchDocuments.push({
      title: title || 'Untitled',
      href,
      excerpt,
      content: searchContent,
    });
  }

  // Write to public directory
  const outputPath = path.join(process.cwd(), 'public', 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchDocuments, null, 2));
  console.log(`Generated search index with ${searchDocuments.length} documents`);
}

generateSearchIndex();
