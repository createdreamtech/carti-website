const emoji = require("remark-emoji");

module.exports = {
  siteMetadata: {
    title: `Carti`,
    description: `Carti: A decentralized package manager for Cartesi Machines`,
    logoUrl: `https://raw.githubusercontent.com/createdreamtech/carti-design/main/svg/carti-logo.svg`,
    author: ``,
    primaryColor: `#3f51b5`, //material-ui primary color
    secondaryColor: `#f50057`, //material-ui secondary color
    menuLinks: [
      {
        name: 'Home',
        link: '/',
        ignoreNextPrev: true
      },
      {
        name: 'Webinar',
        link: '/webinar'
      },
      {
        name: 'Getting Started',
        link: '/getting-started'
      },
      {
        name: 'Beginners',
        link: '/beginners'
      },
      {
        name: 'Use',
        link: '/use'
      },
      {
        name: 'Learn',
        link: '/learn'
      },
      {
        name: 'Developers',
        link: '/developers'
      }
    ],
    footerLinks: [
      {
        name: 'Getting Started',
        link: '/getting-started'
      },
      {
        name: 'Specification',
        link: 'https://spec.open-rpc.org'
      },
      {
        name: 'Github',
        link: 'https://github.com/createdreamtech/carti'
      }
    ]
  },
  plugins: [
    "@etclabscore/gatsby-theme-pristine",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Carti Website`,
        short_name: `carti-site`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#3f51b5`,
        display: `minimal-ui`,
        icon: `src/images/carti.svg`
      },
    }
  ],
}
