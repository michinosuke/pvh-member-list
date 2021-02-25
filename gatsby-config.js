module.exports = {
  siteMetadata: {
    title: `VCC Members`,
    author: {
      name: `Vtuber Music`,
      summary: `Vtuber Creators Community Admin`,
    },
    description: `Vtuber Creators Communityのメンバー情報`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.app/`,
    social: {
      twitter: `vtubermusiccom`,
    },
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
  ],
}
