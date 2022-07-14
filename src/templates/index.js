import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="一覧" />
      <p>{data.allUser.nodes.length}人の自己紹介が登録されています。</p>
      <Heading text="メンバー" />
      <ul className="mt-4">
        {data.allUser.nodes.map((user, i) => {
          return (
            <li
              key={i}
              className={`relative px-3 mt-5 mx-1 border-l-8 border-yellow-500`}
            >
              <h2 className="text-lg">{user.name}</h2>
              <Link
                to={`/user/${user.id}`}
                className="absolute top-0 left-0 w-full h-full"
              />
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

const Heading = ({ text }) => (
  <h2 className="mt-7 text-lg inline-block border-b-2 border-yellow-500">
    {text}
  </h2>
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allUser(sort: { fields: [createdAt], order: DESC }) {
      nodes {
        id
        discordName
        name
        twitterId
        favorite
        others {
          key
          value
        }
        createdAt
      }
    }
  }
`
