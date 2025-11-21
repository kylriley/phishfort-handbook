# PhishFort Reporting Handbook - Markdoc Documentation

This directory contains the Markdoc-formatted documentation for the PhishFort Reporting Handbook, converted from the original PDF.

## Structure Overview

```
docs/
├── index.md                          # Main landing page with quick reference
├── getting-started.md                # Why first reports matter, what can/cannot be taken down
├── evidence-guidelines.md            # What makes evidence stronger
├── domain-incidents.md               # Domain takedown requirements
├── email-attacks.md                  # Email attack evidence requirements
├── phone-attacks.md                  # Phone scams and smishing
│
├── social-media/                     # Social media platforms
│   ├── index.md                      # Social media overview
│   ├── facebook.md
│   ├── twitter.md
│   ├── tiktok.md
│   ├── linkedin.md
│   └── youtube.md
│
├── messaging/                        # Messaging platforms
│   ├── index.md                      # Messaging overview
│   ├── whatsapp.md
│   ├── telegram.md
│   └── discord.md
│
├── other-platforms/                  # Other platform types
│   ├── ip-reporting.md
│   ├── github.md
│   ├── gitbook.md
│   ├── scribd.md
│   ├── apk.md
│   ├── browser-extensions.md
│   ├── google-ads.md
│   └── search-engines.md
│
├── legal/                            # Legal frameworks
│   ├── trademark-copyright.md
│   ├── fair-use.md
│   └── icann-udrp.md
│
└── special-cases/                    # Special case handling
    ├── fake-news.md
    ├── scams.md
    └── bulk-reporting.md
```

## Total Pages: 29

## Markdoc Features Used

### Frontmatter
Each page includes YAML frontmatter with:
- `title`: Page title
- `description`: Brief page description

### Custom Markdoc Tags

The documentation uses Markdoc callout tags:

```markdoc
{% callout type="note" %}
Important information here
{% /callout %}
```

Types available:
- `note` - General information
- `warning` - Cautionary information
- `danger` - Critical warnings
- `tip` - Helpful tips
- `check` - Checkboxes/requirements

### Heading Anchors

Headings can be given custom IDs for linking:

```markdoc
## My Section {% #my-section %}
```

Link to it:
```markdoc
[Link text](page#my-section)
```

### Internal Cross-References

All internal links use relative paths:
- `./` or `../` - Root index (depending on current location)
- `getting-started` - Top-level page from root
- `../getting-started` - Top-level page from subdirectory
- `social-media/facebook` - Nested page from root
- `../social-media/facebook` - Nested page from another subdirectory
- `legal/fair-use#key-section` - With anchor from root
- `../legal/fair-use#key-section` - With anchor from subdirectory

## Setting Up Markdoc

### 1. Install Markdoc

```bash
npm install @markdoc/markdoc
```

### 2. Create Markdoc Config

Create `markdoc.config.js`:

```javascript
module.exports = {
  tags: {
    callout: {
      render: 'Callout',
      attributes: {
        type: {
          type: String,
          default: 'note',
          matches: ['note', 'warning', 'danger', 'tip', 'check']
        }
      }
    },
    card: {
      render: 'Card',
      attributes: {
        title: { type: String },
        href: { type: String }
      }
    },
    grid: {
      render: 'Grid',
      attributes: {
        cols: { type: String, default: '2' }
      }
    }
  }
};
```

### 3. Create React Components

Create components for custom tags:

**components/Callout.jsx**:
```jsx
export function Callout({ type = 'note', children }) {
  const styles = {
    note: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
    danger: 'bg-red-50 border-red-200',
    tip: 'bg-green-50 border-green-200',
    check: 'bg-gray-50 border-gray-200'
  };

  return (
    <div className={`border-l-4 p-4 my-4 ${styles[type]}`}>
      {children}
    </div>
  );
}
```

### 4. Render Pages

```javascript
import Markdoc from '@markdoc/markdoc';
import { Callout } from './components/Callout';

const components = {
  Callout,
  // Add other components...
};

function renderPage(markdownContent) {
  const ast = Markdoc.parse(markdownContent);
  const content = Markdoc.transform(ast);
  return Markdoc.renderers.react(content, React, { components });
}
```

## Navigation Structure

### Recommended Site Navigation

```
PhishFort Reporting Handbook
├─ Getting Started
│  ├─ Why First Report Matters
│  └─ What Can/Cannot Be Taken Down
├─ Evidence Guidelines
├─ Incident Types
│  ├─ Domain Incidents
│  ├─ Email Attacks
│  ├─ Social Media
│  │  ├─ Facebook
│  │  ├─ Twitter/X
│  │  ├─ TikTok
│  │  ├─ LinkedIn
│  │  └─ YouTube
│  ├─ Messaging
│  │  ├─ WhatsApp
│  │  ├─ Telegram
│  │  └─ Discord
│  ├─ Phone Attacks
│  └─ Other Platforms
│     ├─ IP Reporting
│     ├─ GitHub
│     ├─ GitBook
│     ├─ Scribd
│     ├─ APK Cases
│     ├─ Browser Extensions
│     ├─ Google Ads
│     └─ Search Engines
├─ Legal Frameworks
│  ├─ Trademark & Copyright
│  ├─ Fair Use Doctrine
│  └─ ICANN & UDRP
└─ Special Cases
   ├─ Fake News
   ├─ Scams
   └─ Bulk Reporting
```

## Key Features

### 1. Logical Organization
- Content split into 29 focused pages
- Clear hierarchy and categories
- Easy to navigate and find information

### 2. Consistent Cross-Linking
- All pages link to related content
- "Return to Home" links on all pages
- Section index pages link to sub-pages

### 3. Markdoc-Specific Formatting
- Callouts for important information
- Custom heading anchors for deep linking
- Frontmatter for metadata
- Tables for evidence requirements

### 4. Searchable Content
- Descriptive titles and headings
- Clear section organization
- Comprehensive coverage of all topics

## Content Types by Page

### Overview Pages (3)
- `index.md` - Main landing page with quick reference table
- `getting-started.md` - Introduction and basic concepts
- `evidence-guidelines.md` - What makes evidence strong

### Platform-Specific Pages (15)
- Social media (6): Facebook, Twitter, TikTok, LinkedIn, YouTube, + index
- Messaging (4): WhatsApp, Telegram, Discord, + index
- Other platforms (8): IP, GitHub, GitBook, Scribd, APK, Browser Extensions, Google Ads, Search Engines

### Incident Type Pages (2)
- `domain-incidents.md`
- `email-attacks.md`
- `phone-attacks.md`

### Legal Framework Pages (3)
- `legal/trademark-copyright.md`
- `legal/fair-use.md`
- `legal/icann-udrp.md`

### Special Cases Pages (3)
- `special-cases/fake-news.md`
- `special-cases/scams.md`
- `special-cases/bulk-reporting.md`

## Next Steps

1. **Set up Markdoc** in your project
2. **Create React components** for custom tags (Callout, Card, Grid)
3. **Configure routing** to match the page structure
4. **Add search functionality** (recommended: Algolia or similar)
5. **Style the documentation** to match PhishFort branding
6. **Add table of contents** for long pages
7. **Implement breadcrumbs** for easy navigation

## Differences from Original PDF

1. **Split into multiple pages** for better navigation and performance
2. **Added Markdoc-specific features** (callouts, custom tags)
3. **Enhanced cross-linking** between related sections
4. **Improved scanability** with better formatting
5. **Consistent structure** across all pages
6. **Better mobile experience** with smaller page sizes

## Maintenance

When updating content:
- Maintain consistent frontmatter structure
- Keep cross-links updated
- Use appropriate callout types
- Test all internal links
- Update navigation structure if adding new pages
