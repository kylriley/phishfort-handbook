// Markdoc configuration for PhishFort Reporting Handbook
// See: https://markdoc.dev/docs/config

module.exports = {
  // Define custom tags used throughout the documentation
  tags: {
    // Callout boxes for important information
    callout: {
      render: 'Callout',
      description: 'Display an informational callout box',
      children: ['paragraph', 'tag', 'list'],
      attributes: {
        type: {
          type: String,
          default: 'note',
          matches: ['note', 'warning', 'danger', 'tip', 'check'],
          errorLevel: 'critical',
          description: 'Controls the color and icon of the callout'
        }
      }
    },

    // Card component for grid layouts
    card: {
      render: 'Card',
      description: 'Display a clickable card',
      children: ['paragraph'],
      attributes: {
        title: {
          type: String,
          required: true,
          description: 'Card title'
        },
        href: {
          type: String,
          required: true,
          description: 'Link destination'
        }
      }
    },

    // Grid layout for organizing cards
    grid: {
      render: 'Grid',
      description: 'Create a responsive grid layout',
      children: ['tag'],
      attributes: {
        cols: {
          type: String,
          default: '2',
          matches: ['1', '2', '3', '4'],
          description: 'Number of columns'
        }
      }
    },

    // Line break for use in tables
    br: {
      render: 'br',
      description: 'Insert a line break (useful in tables)',
      selfClosing: true
    }
  },

  // Variables available to all pages
  variables: {
    siteName: 'PhishFort Reporting Handbook',
    siteUrl: 'https://handbook.phishfort.com', // Update with actual URL
    company: 'PhishFort'
  },

  // Functions available in templates
  functions: {
    // Add any custom functions here if needed
  },

  // Validation settings
  validation: {
    validateFrontmatter: true,
    validateLinks: true
  }
};
