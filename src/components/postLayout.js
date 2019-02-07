import React, { Component } from 'react'
import Layout from './layout'
import { graphql } from 'gatsby'

// Post layout template
class PostLayout extends Component {
  render () {
    const { data: { markdownRemark }, location } = this.props

    return (
      <Layout location={location}>
        <h1>{markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }}/>
      </Layout>
    )
  }
}

export default PostLayout

export const pageQuery = graphql`
    query PostQuery($slug: String!){
        markdownRemark(frontmatter:{
            slug:{
                eq: $slug
            }
        }){
            html
            timeToRead
            frontmatter{
                title
                slug
                date
            }
        }
    }
`