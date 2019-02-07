import React, { Component } from 'react'
import Layout from './layout'
import { graphql } from 'gatsby'
import SEO from '../components/seo'

// Post layout template
class PostLayout extends Component {
  render () {
    const { data: { markdownRemark }, location } = this.props

    return (
      <Layout location={location}>
        <SEO
          title={markdownRemark.frontmatter.title}
          description="post spencer desc"
          keywords={[`gatsby`, `application`, `react`]}/>
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