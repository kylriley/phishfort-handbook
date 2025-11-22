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

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> | { slug?: string[] } }) {
  try {
    // Handle both Promise and direct params for Next.js compatibility
    const resolvedParams = params instanceof Promise ? await params : params;
    const slug = resolvedParams.slug || [];
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
    
    // Add IDs to h2 headings
    const addHeadingIds = (node: any): any => {
      if (!node) return node;
      
      if (node.type === 'heading' && node.attributes?.level === 2) {
        // Extract text from heading
        const text = extractHeadingText(node);
        if (text) {
          // Check if there's already a custom ID
          let hasCustomId = false;
          if (node.children) {
            for (const child of node.children) {
              if (child.type === 'tag' && child.tag === 'tag' && child.attributes?.name === '#') {
                hasCustomId = true;
                node.attributes.id = child.attributes.value || '';
                break;
              }
            }
          }
          
          // Generate ID if no custom ID found
          if (!hasCustomId) {
            node.attributes = node.attributes || {};
            node.attributes.id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '');
          }
        }
      }
      
      // Recursively process children
      if (node.children && Array.isArray(node.children)) {
        node.children = node.children.map(addHeadingIds);
      }
      
      return node;
    }
    
    const extractHeadingText = (node: any): string => {
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
        return node.children.map(extractHeadingText).join('').trim();
      }
      return '';
    }
    
    const astWithIds = addHeadingIds(ast);
    
    const content = Markdoc.transform(astWithIds, {
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
      nodes: {
        heading: {
          render: 'Heading',
          attributes: {
            level: { type: Number, required: true },
            id: { type: String },
          },
        },
      },
    });
    
    // Custom Heading component to ensure IDs are set
    const Heading = ({ level, id, children, ...props }: { level: number; id?: string; children: React.ReactNode }) => {
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      return <HeadingTag id={id} {...props}>{children}</HeadingTag>;
    }

    const componentsWithHeading = {
      ...components,
      Heading,
    };

    const reactNode = Markdoc.renderers.react(content, React, { components: componentsWithHeading });
    
    return (
      <div className="prose max-w-4xl mx-auto">
        {reactNode}
      </div>
    );
  } catch (error) {
    console.error('Error rendering page:', error);
    return (
      <div className="prose max-w-4xl mx-auto">
        <h1>Error Loading Page</h1>
        <p>An error occurred while loading this page. Please try again later.</p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="text-xs bg-red-50 p-4 rounded mt-4">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        )}
      </div>
    );
  }
}
