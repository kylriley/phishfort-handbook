import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Markdoc from '@markdoc/markdoc';

interface SearchDocument {
  title: string;
  href: string;
  excerpt: string;
  content: string;
}

function getAllMarkdownFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
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

function extractTextFromMarkdoc(source: string): string {
  const ast = Markdoc.parse(source);

  // Extract text content from AST
  function extractText(node: any): string {
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

export async function GET() {
  try {
    const docsDir = path.join(process.cwd(), 'docs');
    const markdownFiles = getAllMarkdownFiles(docsDir);

    const searchDocuments: SearchDocument[] = [];

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
        .replace(/\.mdoc?$/, '')
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

    return NextResponse.json(searchDocuments);
  } catch (error) {
    console.error('Error building search index:', error);
    return NextResponse.json(
      { error: 'Failed to build search index' },
      { status: 500 }
    );
  }
}
