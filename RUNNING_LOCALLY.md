# Running the PhishFort Handbook Locally

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Pages

Once the server is running, you can navigate to:

- `/` - Home page (index.md)
- `/getting-started` - Getting started guide
- `/evidence-guidelines` - Evidence guidelines
- `/domain-incidents` - Domain incidents
- `/email-attacks` - Email attacks
- `/social-media` - Social media overview
- `/social-media/facebook` - Facebook-specific guide
- `/social-media/twitter` - Twitter/X guide
- `/messaging/whatsapp` - WhatsApp guide
- `/legal/fair-use` - Fair Use Doctrine
- And all other pages in the `/docs` directory...

## How It Works

1. **Next.js** reads Markdown files from the `/docs` directory
2. **Markdoc** parses and transforms the content
3. **React components** render custom tags (callouts, cards, grids)
4. **Tailwind CSS** provides styling
5. **FlexSearch** powers the search functionality
6. **Navigation sidebar** provides easy access to all pages
7. **Search bar** allows quick content discovery

## Project Structure

```
phishfort-reporting-page/
├── app/                  # Next.js app directory
│   ├── [[...slug]]/     # Dynamic route for all docs pages
│   ├── layout.tsx       # Root layout with header
│   └── globals.css      # Global styles
├── components/          # React components for Markdoc tags
│   ├── Callout.tsx     # Callout boxes
│   ├── Card.tsx        # Card components
│   └── Grid.tsx        # Grid layouts
├── docs/               # Markdoc content (29 pages)
│   ├── index.md
│   ├── getting-started.md
│   ├── social-media/
│   ├── messaging/
│   └── ...
├── markdoc.config.js   # Markdoc configuration
└── next.config.js      # Next.js configuration
```

## Development Commands

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

## Editing Content

1. Edit any `.md` file in the `/docs` directory
2. Save the file
3. The page will automatically reload in your browser
4. Changes appear instantly (hot reload)

## Adding New Pages

1. Create a new `.md` file in `/docs` (or subdirectory)
2. Add frontmatter:
   ```yaml
   ---
   title: Page Title
   description: Page description
   ---
   ```
3. Add your content
4. Navigate to `http://localhost:3000/your-new-page`

## Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
PORT=3001 npm run dev
```

### Changes not appearing
1. Stop the server (Ctrl+C)
2. Delete `.next` folder: `rm -rf .next`
3. Restart: `npm run dev`

### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```
