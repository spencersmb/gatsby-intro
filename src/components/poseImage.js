import React, { Component } from 'react'
import posed from 'react-pose'
import Img from 'gatsby-image'

const ImgPose = posed.div({
  closed: {
    height: 300,
    overflow: 'hidden',
    transition: {
      duration: 400,
      ease: 'easeOut',
    },
  },
  open: {
    height: 200, overflow: 'hidden', transition: {},
  },
})

class PoseImage extends Component {
  render () {
    return (
      <ImgPose
        styles={{ overflow: 'hidden' }}
        key="1"
        initialPose={this.props.path === '/' ? 'open' : 'closed'}
        pose={this.props.path === '/' ? 'closed' : 'open'}>
        <Img fluid={this.props.img}/>
      </ImgPose>
    )
  }
}

export default PoseImage