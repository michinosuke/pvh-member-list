const path = require(`path`)
const fetch = require('node-fetch')

const skillFieldsList = []

const isClosed = process.env.MODE === 'CLOSED'

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest }) => {
  const users = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=F1MhFG5IsgafF8xBLn9XRGUwk38LJzP1K5UN6Edww2ZehRt8nrKMBEteqVy_7NOwGepzNkzqbWQyVDI3PaA1S24HZ24Z954em5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLtcJ4QdtAa6VYv3USKD50W-6NaEmuPWlfrqgRDH9PZAo_cLNbdZm3jT3WsH8MCUfizStk4eEt_hGGaU2pP6Ntk&lib=MG_iUP8jn_e2IqEcosB-IYhxzlo5DDtxR')
    .then(response => {
      console.log(response)
      return response.json()
    })
    .catch(e => {
      throw new Error(e)
    })
  
  users.forEach(user => {
    const skillFields = user['専門分野'].split(', ')
    skillFields.forEach(field => {
      if (!skillFieldsList.includes(field)) {
        skillFieldsList.push(field)
      }
    })

    const isPrivate = user['is_private'] !== ''

    if (!isClosed && isPrivate) return

    createNode({
      id: user['Twitter ID'] || user['名前'],
      name: user['名前'],
      id_twitter: user['Twitter ID'],
      id_discord: user['Discord ID'],
      intro_product: user['作ってるもの or 作りたいもの'],
      intro_skill: user['得意なこと'],
      intro_greeting: user['ひとこと'],
      is_private: isPrivate,
      where_from: user['このコミュニティをどこで知りましたか?'],
      skill_fields: skillFields,
      created_at: new Date(user['タイムスタンプ']),
      internal: {
        type: 'User',
        contentDigest: createContentDigest(user)
      }
    })
  })
  console.log(JSON.stringify(skillFieldsList))
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  createPage({
    path: `/`,
    component: path.resolve(`./src/templates/index.js`),
    context: {
      skillFieldsList
    }
  })

  const { data: { allUser }} = await graphql(`
    {
      allUser {
        nodes {
          id
        }
      }
    }
  `)

  allUser.nodes.forEach(({id}) => {
    createPage({
      path: `/user/${id}`,
      component: path.resolve(`./src/templates/user.js`),
      context: {
        id
      }
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type User implements Node {
      name: String!
      id_twitter: String
      id_discord: String!
      intro_product: String
      intro_skill: String
      intro_greeting: String
      is_private: Boolean!
      where_from: String
      skill_fields: [String]!
      created_at: Date @dateformat
    }
  `)
}
