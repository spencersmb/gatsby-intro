import React, { Component } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

const GET_ALL_POSTS = graphql`
    query GET_ALL_POSTS{
        allMarkdownRemark(
            sort:{
                order:DESC
                fields:[
                    frontmatter___date
                ]
            },
            limit: 10
        ){
            edges{
                node{
                    id
                    excerpt
                    frontmatter{
                        title
                        slug
                        date(formatString: "MMMM DD, YYYY")
                    }
                }
            }
        }
    }
`

class Listings extends Component {
  render () {
    return (
      <div>
        <h3>Blog posts</h3>
        <StaticQuery query={GET_ALL_POSTS} render={({ allMarkdownRemark }) => {

          return (
            <div>
              {allMarkdownRemark.edges.map(({ node }) => {

                return (
                  <article key={node.id}>
                    <Link to={`/posts${node.frontmatter.slug}`}>
                      <h2 style={{ marginBottom: 5 }}>{node.frontmatter.title}</h2>
                    </Link>
                    <p style={{ marginBottom: 5 }}>{node.frontmatter.date}</p>
                    <p>{node.excerpt}</p>
                    <Link to={`/posts${node.frontmatter.slug}`}>
                      <p>Read more</p>
                    </Link>
                  </article>
                )
              })}
            </div>
          )
        }}/>
      </div>
    )
  }
}

export default Listings