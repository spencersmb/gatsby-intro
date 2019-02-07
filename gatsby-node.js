/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const pageQuery = `
    {
      allMarkdownRemark{
        edges{
          node{
            frontmatter{
              slug
            }
          }
        }
      }
    }
    `
// You can delete this file if you're not using it
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(pageQuery).then(results => {

      if (results.errors) {
        console.log(results.errors)
        reject(results.errors)
      }
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {

        createPage({
          path: `/posts${node.frontmatter.slug}`,
          component: path.resolve(`./src/components/postLayout.js`),
          context: {
            slug: node.frontmatter.slug,
          },
        })
      })
    })
    resolve()
  })

}