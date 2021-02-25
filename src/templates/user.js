import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, location }) => {
  const user = data.user
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={user.name}
      />
      <Link to={`/${location?.state?.isPrivate ? '?mode=private' : ''}`}><button className='mt-5 px-3 py-1 text-sm bg-yellow-500 text-white'>←ホーム</button></Link>
      <article>
        <h2 className='mt-5 text-4xl'>{user.name}</h2>
        <h3 className='mt-7 text-lg inline-block border-b-2 border-yellow-500'>基本情報</h3>
        <p className='mt-3'>twitter: <a href={`https://twitter.com/${user.id_twitter}/`} target='_blank' className='px-3 py-1 bg-blue-500 text-white'>@{user.id_twitter}</a></p>
        <p className='mt-3'>discord: {user.id_discord.split('#')[0] + '#XXXX'}<span className='ml-3 text-gray-600 text-xs'>(プライバシー保護のためにIDは隠しています)</span></p>
        <p className='text-lg inline-block mt-7 border-b-2 border-yellow-500'>専門</p>
        <ul className='flex mt-3'>{user.skill_fields.map(f => <li className='px-3 py-1 text-sm bg-yellow-500 text-white'>{f}</li>)}</ul>
        {user.intro_product !== '' &&
          <section className='mt-7'>
            <h3 className='text-lg inline-block border-b-2 border-yellow-500'>作ってるもの or 作りたいもの</h3>
            <p className='mt-3'>{user.intro_product}</p>
          </section>
        }
        {user.intro_skill !== '' &&
          <section className='mt-7'>
            <h3 className='text-lg inline-block border-b-2 border-yellow-500'>得意なこと</h3>
            <p className='mt-3'>{user.intro_skill}</p>
          </section>
        }
        {user.intro_greeting !== '' &&
          <section className='mt-7'>
            <h3 className='text-lg inline-block border-b-2 border-yellow-500'>ひとこと</h3>
            <p className='mt-3'>{user.intro_greeting}</p>
          </section>
        }
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    user(id: {eq: $id}) {
      id
      name
      id_twitter
      id_discord
      intro_product
      intro_skill
      intro_greeting
      is_private
      where_from
      skill_fields
      created_at
    }
  }
`
