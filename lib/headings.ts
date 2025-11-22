import fs from 'fs';
import path from 'path';
import Markdoc from '@markdoc/markdoc';

export interface Heading {
  title: string;
  id: string;
}

/**
 * Extract h2 headings from a markdown file
 * Skips the main page title (h1) and returns all h2 headings
 */
export function extractHeadings(filePath: string): Heading[] {
  try {
    const source = fs.readFileSync(filePath, 'utf-8');
    const ast = Markdoc.parse(source);
    
    const headings: Heading[] = [];
    
    const traverse = (node: any) => {
      if (!node) return;
      
      // Look for h2 headings (heading nodes with level 2)
      if (node.type === 'heading' && node.attributes?.level === 2) {
        // Extract text content from the heading
        const title = extractTextFromNode(node);
        
        // Generate ID from title (lowercase, replace spaces with hyphens, remove special chars)
        // Or use custom ID if provided in markdoc format like {% #custom-id %}
        let id = '';
        
        // Check if there's a custom ID in the heading
        if (node.children) {
          for (const child of node.children) {
            if (child.type === 'tag' && child.tag === 'tag' && child.attributes?.name === '#') {
              id = child.attributes?.value || '';
              break;
            }
          }
        }
        
        // If no custom ID, generate one from title
        if (!id) {
          id = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        }
        
        headings.push({ title, id });
      }
      
      // Recursively traverse children
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(traverse);
      }
    }
    
    traverse(ast);
    
    return headings;
  } catch (error) {
    console.error(`Error extracting headings from ${filePath}:`, error);
    return [];
  }
}

/**
 * Extract text content from a node
 */
function extractTextFromNode(node: any): string {
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
    return node.children.map(extractTextFromNode).join('').trim();
  }
  
  return '';
}

/**
 * Get headings for a page based on its href
 */
export function getHeadingsForPage(href: string): Heading[] {
  if (href === '/' || href === '#') {
    return [];
  }
  
  const docsDir = path.join(process.cwd(), 'docs');
  
  // Remove leading slash
  const slug = href.startsWith('/') ? href.slice(1) : href;
  
  if (!slug) {
    return [];
  }
  
  // Try to find the markdown file
  const filePath = path.join(docsDir, slug) + '.md';
  
  if (fs.existsSync(filePath)) {
    return extractHeadings(filePath);
  }
  
  // Try index.md in a directory
  const indexPath = path.join(docsDir, slug, 'index.md');
  if (fs.existsSync(indexPath)) {
    return extractHeadings(indexPath);
  }
  
  return [];
}

