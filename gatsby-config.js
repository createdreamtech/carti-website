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
        name: 'Getting Started',
        link: '/getting-started'
      },
      {
        name: "Main Concepts",
        link: "/docs#concepts"

      },
      {
        name: 'Use',
        link: '/getting-started#commands'
      },
      {
        name: 'Tutorial',
        link: '/tutorial'
      },
      {
        name: 'Docs',
        link: '/docs'
      }
    ],
    footerLinks: [
      {
        name: 'Getting Started',
        link: '/getting-started'
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
