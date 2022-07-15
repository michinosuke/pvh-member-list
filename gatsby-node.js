const path = require(`path`)
const { promises: fs } = require("fs")
const { parse } = require("date-fns")

const isClosed = process.env.MODE === "CLOSED"

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // const users = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=F1MhFG5IsgafF8xBLn9XRGUwk38LJzP1K5UN6Edww2ZehRt8nrKMBEteqVy_7NOwGepzNkzqbWQyVDI3PaA1S24HZ24Z954em5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLtcJ4QdtAa6VYv3USKD50W-6NaEmuPWlfrqgRDH9PZAo_cLNbdZm3jT3WsH8MCUfizStk4eEt_hGGaU2pP6Ntk&lib=MG_iUP8jn_e2IqEcosB-IYhxzlo5DDtxR')
  //   .then(response => {
  //     console.log(response)
  //     return response.json()
  //   })
  //   .catch(e => {
  //     throw new Error(e)
  //   })

  const users = JSON.parse(
    await fs.readFile("./data.json", { encoding: "utf-8" })
  )

  users.forEach((user, id) => {
    const {
      DISCORD_NAME,
      名前,
      twitterIds,
      見ているVTuberや配信,
      DATE,
      ...others
    } = user
    console.log(parse(DATE, "yyyy/MM/dd", new Date()), 名前)
    createNode({
      id: id.toString(),
      discordName: DISCORD_NAME,
      name: 名前,
      twitterIds,
      favorite: 見ているVTuberや配信,
      createdAt: parse(DATE, "yyyy/MM/dd", new Date()),
      others: Object.keys(others).map(key => ({
        key,
        value: others[key],
      })),
      internal: {
        type: "User",
        contentDigest: createContentDigest(user),
      },
    })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  createPage({
    path: `/`,
    component: path.resolve(`./src/templates/index.js`),
  })

  const {
    data: { allUser },
  } = await graphql(`
    {
      allUser {
        nodes {
          id
        }
      }
    }
  `)

  allUser.nodes.forEach(({ id }) => {
    createPage({
      path: `/user/${id}`,
      component: path.resolve(`./src/templates/user.js`),
      context: {
        id,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type UserOption {
      key: String!
      value: String!
    }

    type User implements Node {
      discordName: String!
      name: String!
      twitterIds: [String]
      favorite: String
      others: [UserOption]!
      createdAt: Date @dateformat
    }
  `)
}
