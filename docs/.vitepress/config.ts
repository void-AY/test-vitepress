import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Sportsbook Documentation',
  description: 'Complete guide and API reference for Sportsbook integration.',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Customize', link: '/customize' },
      { text: 'API', link: '/getting-started' },
    ],

    sidebar: [
      {
        text: 'Documentation', // Заголовок группы
        items: [
          {
            text: 'Getting Started',
            link: '/getting-started',
          },
          {
            text: 'API Functions',
            link: '/api-functions',
          },
          {
            text: 'CSS Variables',
            link: '/css-variables',
          },
          {
            text: 'Platform Overview',
            link: '/platform-overview',
          },
          {
            text: 'Backend Integration',
            link: '/backend-integration',
          },
        ],
      },
    ],
  },
})
