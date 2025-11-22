// Navigation structure for the documentation
export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Getting Started',
    href: '/getting-started',
  },
  {
    title: 'Quick Reference',
    href: '/quick-reference',
  },
  {
    title: 'Evidence Guidelines',
    href: '/evidence-guidelines',
  },
  {
    title: 'Incident Types',
    href: '#',
    children: [
      {
        title: 'Domain Incidents',
        href: '/domain-incidents',
      },
      {
        title: 'Email Attacks',
        href: '/email-attacks',
      },
      {
        title: 'Phone Attacks',
        href: '/phone-attacks',
      },
      {
        title: 'Social Media',
        href: '/social-media',
        children: [
          {
            title: 'Facebook',
            href: '/social-media/facebook',
          },
          {
            title: 'Twitter/X',
            href: '/social-media/twitter',
          },
          {
            title: 'TikTok',
            href: '/social-media/tiktok',
          },
          {
            title: 'LinkedIn',
            href: '/social-media/linkedin',
          },
          {
            title: 'YouTube',
            href: '/social-media/youtube',
          },
        ],
      },
      {
        title: 'Messaging',
        href: '/messaging',
        children: [
          {
            title: 'WhatsApp',
            href: '/messaging/whatsapp',
          },
          {
            title: 'Telegram',
            href: '/messaging/telegram',
          },
          {
            title: 'Discord',
            href: '/messaging/discord',
          },
        ],
      },
      {
        title: 'Other Platforms',
        href: '#',
        children: [
          {
            title: 'IP Reporting',
            href: '/other-platforms/ip-reporting',
          },
          {
            title: 'GitHub',
            href: '/other-platforms/github',
          },
          {
            title: 'GitBook',
            href: '/other-platforms/gitbook',
          },
          {
            title: 'Scribd',
            href: '/other-platforms/scribd',
          },
          {
            title: 'APK Cases',
            href: '/other-platforms/apk',
          },
          {
            title: 'Browser Extensions',
            href: '/other-platforms/browser-extensions',
          },
          {
            title: 'Google Ads',
            href: '/other-platforms/google-ads',
          },
          {
            title: 'Search Engines',
            href: '/other-platforms/search-engines',
          },
        ],
      },
    ],
  },
  {
    title: 'Legal Frameworks',
    href: '#',
    children: [
      {
        title: 'Trademark & Copyright',
        href: '/legal/trademark-copyright',
      },
      {
        title: 'Fair Use Doctrine',
        href: '/legal/fair-use',
      },
      {
        title: 'ICANN & UDRP',
        href: '/legal/icann-udrp',
      },
    ],
  },
  {
    title: 'Special Cases',
    href: '#',
    children: [
      {
        title: 'Fake News',
        href: '/special-cases/fake-news',
      },
      {
        title: 'Scams',
        href: '/special-cases/scams',
      },
      {
        title: 'Bulk Reporting',
        href: '/special-cases/bulk-reporting',
      },
    ],
  },
];
