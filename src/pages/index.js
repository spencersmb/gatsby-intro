import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import Listings from '../components/listings'

const IndexPage = ({ location }) => (
  // location comes from props
  // change the stlye of the the image size depending on what page we are on
  <Layout location={location}>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
    <Listings/>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image/>
    </div>
    <div>
      <Link to="/page-2/">Go to page 2</Link>
    </div>
  </Layout>
)

export default IndexPage
