// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'eduLAB Engineering Blog',
  tagline: 'Documenting the journey from breadboard to professional hardware design',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // GitHub Pages config - FIXED!
  url: 'https://MatiDashkov07.github.io',
  baseUrl: '/portfolio_eduLAB/',
  organizationName: 'MatiDashkov07',
  projectName: 'portfolio_eduLAB',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // KaTeX stylesheet
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: 'projects',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogTitle: 'Engineering Blog',
          blogDescription: 'Build logs, debugging stories, and technical deep-dives',
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 10,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'eduLAB',
        logo: {
          alt: 'eduLAB Logo',
          src: 'img/logo.svg',
        },
        items: [
          {to: '/projects', label: 'Projects', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/about', label: 'About', position: 'left'},
          {
            href: 'https://github.com/MatiDashkov07',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Links',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/MatiDashkov07',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/mati-dashkov-33740b375',
              },
              {
                label: 'Email',
                href: 'mailto:matidashkov5@gmail.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} eduLAB. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['cpp', 'python', 'bash'],
      },
    }),
};

export default config;