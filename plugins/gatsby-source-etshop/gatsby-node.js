const fetch = require('node-fetch')
const queryString = require('query-string')
const fs = require('fs-extra')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async (
  {
    actions, createNodeId, createContentDigest, store,
    cache,
  },
  configOptions,
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // Helper function that processes a photo to match Gatsby's node structure
  const processProduct = async (product, store,
                                cache,
                                createNode,
                                createNodeId) => {
    //  https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-filesystem#createremotefilenode
    await Promise.all(product.images.map(async image => {
      const fileNode = await createRemoteFileNode({
        url: image.fullSize.url,
        store,
        cache,
        createNode,
        createNodeId,
      })
      return image.localFile___NODE = fileNode.id
    }))

    const nodeId = createNodeId(`etshop-product-${product.id}`)
    const nodeContent = JSON.stringify(product)

    return Object.assign({}, product, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `EtShopProduct`,
        content: nodeContent,
        contentDigest: createContentDigest(product),
      },
    })
  }

  // const apiOptions = queryString.stringify(configOptions)
  // console.log('apiOptions', apiOptions)
  //
  // // Join apiOptions with the Pixabay API URL
  const dev = process.env.NODE_ENV !== 'production'
  // console.log('dev', dev)

  const apiUrl = `http://shopeverytuesday.local/wp-json/et-shop/graphql/products`
  const apiResponse = await fetch(apiUrl)
  const results = await apiResponse.json()

  const jsonResults = JSON.stringify(results.data)
  fs.writeFileSync('src/state/products.json', jsonResults)

  results.data.forEach(async (product) => {
    // Process the photo data to match the structure of a Gatsby node
    const productNode = await processProduct(product, store,
      cache,
      createNode,
      createNodeId)

    createNode(productNode)
    // Use Gatsby's createNode helper to create a node from the node data
  })

  // Gatsby expects sourceNodes to return a promise
  // return (
  //   // Fetch a response from the apiUrl
  //   fetch(apiUrl)
  //   // Parse the response as JSON
  //     .then(response => response.json())
  //     // Process the JSON data into a node
  //     .then(results => {
  //       // console.log('results', results)
  //       const jsonResults = JSON.stringify(results.data)
  //       fs.writeFileSync('src/state/products.json', jsonResults)
  //       // For each query result (or 'hit')
  //       results.data.forEach(product => {
  //         // Process the photo data to match the structure of a Gatsby node
  //         return processProduct(product, store,
  //           cache,
  //           createNode,
  //           createNodeId).then(res => {
  //           return createNode(res)
  //         })
  //         // Use Gatsby's createNode helper to create a node from the node data
  //
  //       })
  //     })
  // )
  // plugin code goes here...
  console.log('Etshop source plugin')
}
// exports.onCreateNode = async ({
//                                 node,
//                                 actions,
//                                 createNodeId,
//                                 store,
//                                 cache,
//                               }) => {
//   // console.log(cache)
// //   const { createNodeField, createNode } = actions
// //   if (node.internal.type === 'EtShopProduct') {
// //     // console.log('productNdoe', node.featuredImage.fullSize.url)
// //
// //     const itemsToAdd = []
// //     node.images.forEach(async (image, index) => {
// //       try {
// //         const galleryImageFileNode = await createRemoteFileNode({
// //           url: image.fullSize.url,
// //           store,
// //           cache,
// //           createNode,
// //           createNodeId,
// //         })
// //
// //         itemsToAdd.push(galleryImageFileNode.id)
// //       } catch (e) {
// //         console.log(err)
// //       }
// //     })
// //
// //     createNodeField({
// //       node,
// //       name: `etGallery___NODE`,
// //       value: itemsToAdd,
// //     })
// //
// //     // try {
// //     //   const featureImageFileNode = await createRemoteFileNode({
// //     //     url: node.featuredImage.fullSize.url,
// //     //     store,
// //     //     cache,
// //     //     createNode,
// //     //     createNodeId,
// //     //   })
// //     //   const featureImageThumbNode = await createRemoteFileNode({
// //     //     url: node.featuredImage.thumbnail.url,
// //     //     store,
// //     //     cache,
// //     //     createNode,
// //     //     createNodeId,
// //     //   })
// //     //
// //     //   // Feature Image
// //     //   createNodeField({
// //     //     node,
// //     //     name: 'etFeatureImageFullSize___NODE',
// //     //     value: featureImageFileNode.id,
// //     //   })
// //     //
// //     //   // Feature Thumb
// //     //   createNodeField({
// //     //     node,
// //     //     name: 'etFeatureImageThumb___NODE',
// //     //     value: featureImageThumbNode.id,
// //     //   })
// //     // } catch (err) {
// //     //   console.log(err)
// //     // }
// //   }
// }