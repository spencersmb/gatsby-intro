import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import GatsbyLogo from '../images/gatsby-icon.png'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: `rebeccapurple`,
      marginBottom: `0`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            flexDirection: 'row',
            color: `white`,
            textDecoration: `none`,
            alignItems: `center`,
          }}
        >
          <img style={{ maxWidth: '100px', width: `100%`, height: `100%`, margin: `0 15px 0 0` }} src={GatsbyLogo}
               alt="Gatsby Logo"/>
          <span>{siteTitle}</span>
        </Link>
      </h1>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
