import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import './layout.css'
import Archive from './archive'
import { Spring } from 'react-spring/renderprops'
import { connect } from 'react-redux'

/**
 * Better comments
 * * Green
 * ! Red
 * ? BLue
 * @param test
 */


const Counter = ({ count, increment }) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
  </div>
)

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
}

const mapStateToProps = ({ count }) => {
  return { count }
}

const mapDispatchToProps = dispatch => {
  return { increment: () => dispatch({ type: `INCREMENT` }) }
}

const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter)

const Layout = ({ children, location = {} }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        },
        file(relativePath: { regex: "/bg/" }) {
        size
        prettySize
        name
        childImageSharp{
          fluid(maxWidth: 1000){
            ...GatsbyImageSharpFluid
          }
        }
        }
      },
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title}/>
        <ConnectedCounter/>
        <Spring
          from={{
            height: location.pathname === '/' ? 100 : 300,
          }}
          to={{
            height: location.pathname === '/' ? 300 : 100,
          }}
        >
          {styles => (
            <div style={{
              overflow: 'hidden', ...styles,
            }}>
              <Img fluid={data.file.childImageSharp.fluid} fadeIn={false}/>
            </div>
          )}
        </Spring>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          {children}
          <Archive/>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
