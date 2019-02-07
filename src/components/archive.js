import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import './layout.css'

const AllPostsQuery = graphql`
    query AllPostsQuery {
        allMarkdownRemark(
            sort:{
                order:DESC
                fields:[
                    frontmatter___date
                ]
            },
            limit: 2
        ){
            edges{
                node{
                    id
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
const Archive = () => (
  <StaticQuery
    query={AllPostsQuery}
    render={({ allMarkdownRemark }) => {
      return (
        <>
          <aside>
            <h3>Archive</h3>
            <ul>
              {allMarkdownRemark.edges.map(edge => {
                return (
                  <li key={edge.node.id}>
                    <Link to={`/posts${edge.node.frontmatter.slug}`}>
                      {edge.node.frontmatter.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </aside>
        </>
      )
    }}
  />
)

export default Archive
