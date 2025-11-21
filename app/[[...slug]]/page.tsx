import fs from 'fs';
import path from 'path';
import Markdoc from '@markdoc/markdoc';
import React from 'react';
import { Callout } from '@/components/Callout';
import { Card } from '@/components/Card';
import { Grid } from '@/components/Grid';

const components = {
  Callout,
  Card,
  Grid,
};

function getDocPath(slug: string[]) {
  const docsDir = path.join(process.cwd(), 'docs');
  
  if (!slug || slug.length === 0) {
    return path.join(docsDir, 'index.md');
  }
  
  const filePath = path.join(docsDir, ...slug) + '.md';
  
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  
  const indexPath = path.join(docsDir, ...slug, 'index.md');
  if (fs.existsSync(indexPath)) {
    return indexPath;
  }
  
  return null;
}

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), 'docs');
  const paths: { slug: string[] }[] = [];
  
  function getAllMarkdownFiles(dir: string, baseDir: string = dir): string[][] {
    const files = fs.readdirSync(dir);
    const markdownFiles: string[][] = [];
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        markdownFiles.push(...getAllMarkdownFiles(filePath, baseDir));
      } else if (file.endsWith('.md')) {
        const relativePath = path.relative(baseDir, filePath);
        const slug = relativePath
          .replace(/\.md$/, '')
          .split(path.sep)
          .filter(s => s !== 'index');
        
        if (slug.length === 0) {
          markdownFiles.push([]);
        } else {
          markdownFiles.push(slug);
        }
      }
    }
    
    return markdownFiles;
  }
  
  const allFiles = getAllMarkdownFiles(docsDir);
  return allFiles.map(slug => ({ slug }));
}

export default function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug || [];
  const filePath = getDocPath(slug);
  
  if (!filePath) {
    return (
      <div className="prose max-w-4xl mx-auto">
        <h1>Page Not Found</h1>
        <p>The requested page could not be found.</p>
      </div>
    );
  }
  
  const source = fs.readFileSync(filePath, 'utf-8');
  const ast = Markdoc.parse(source);
  const content = Markdoc.transform(ast, {
    tags: {
      callout: {
        render: 'Callout',
        attributes: {
          type: {
            type: String,
            default: 'note',
          },
        },
      },
      card: {
        render: 'Card',
        attributes: {
          title: { type: String },
          href: { type: String },
        },
      },
      grid: {
        render: 'Grid',
        attributes: {
          cols: { type: String, default: '2' },
        },
      },
      br: {
        render: 'br',
        selfClosing: true,
      },
    },
  });
  
  const reactNode = Markdoc.renderers.react(content, React, { components });
  
  return (
    <div className="prose max-w-4xl mx-auto">
      {reactNode}
    </div>
  );
}
