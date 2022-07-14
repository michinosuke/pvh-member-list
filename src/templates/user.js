import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { format } from "date-fns"

export default ({ data, location }) => {
  const user = data.user
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={user.name} />{" "}
      <Link to="/">
        <button className="mt-5 px-3 py-1 text-sm bg-yellow-500 text-white">
          ←ホーム
        </button>
      </Link>
      <article>
        <h2 className="mt-5 text-4xl">{user.name}</h2>
        {user.discordName && (
          <section className="mt-7">
            <h3 className="text-lg inline-block border-b-2 border-yellow-500">
              Discordユーザ名
            </h3>
            <p className="mt-3">{user.discordName}</p>
          </section>
        )}
        {user.twitterId && (
          <section className="mt-7">
            <h3 className="text-lg inline-block border-b-2 border-yellow-500">
              Twitter
            </h3>
            <p className="mt-3">
              <a
                href={`https://twitter.com/${user.twitterId}/`}
                target="_blank"
                className="px-3 py-1 bg-blue-500 text-white"
              >
                @{user.twitterId}
              </a>
            </p>
          </section>
        )}
        {user.createdAt && (
          <section className="mt-7">
            <h3 className="text-lg inline-block border-b-2 border-yellow-500">
              自己紹介 投稿日
            </h3>
            <p className="mt-3">
              {format(new Date(user.createdAt), "yyyy/MM/dd")}
            </p>
          </section>
        )}
        {user.favorite && (
          <section className="mt-7">
            <h3 className="text-lg inline-block border-b-2 border-yellow-500">
              見ているVTuberや配信
            </h3>
            <p className="mt-3">{user.favorite}</p>
          </section>
        )}
        {user.others.map((content, key) => (
          <section className="mt-7" key={key}>
            <h3 className="text-lg inline-block border-b-2 border-yellow-500">
              {content.key}
            </h3>
            <p className="mt-3">{content.value}</p>
          </section>
        ))}
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    user(id: { eq: $id }) {
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
`
