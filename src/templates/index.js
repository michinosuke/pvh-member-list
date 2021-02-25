import React, {useState} from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, pathContext: { skillFieldsList }, location }) => {
  const [fieldFilter, setFieldFilter] = useState(null)
  const [isPrivate, _] = useState(window.location.search?.split('=')?.[1] === 'private')

  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <p>{data
        .allUser
        .nodes
        .filter(user => !user.is_private || isPrivate)
        .length}人が所属しています。</p>
      <Heading text='専門分野'/>
      <ul className='mt-4'>
        <span onClick={() => setFieldFilter(null)} className={`px-2 py-1 mr-1 rounded-full text-xs text-white cursor-pointer ${fieldFilter ? 'bg-yellow-500' : 'bg-red-500'}`}>すべて</span>
        {skillFieldsList.map(field => (
          <span onClick={() => setFieldFilter(field)} className={`px-2 py-1 mr-1 rounded-full text-xs text-white cursor-pointer ${fieldFilter === field ? 'bg-red-500' : 'bg-yellow-500'}`}>{field}</span>
        ))}
      </ul>
      <Heading text='メンバー'/>
      <ul className='mt-4'>
        {data
          .allUser
          .nodes
          .filter(user => {
            if (user.is_private && !isPrivate) return false
            if (fieldFilter === null) return true
            if (user.skill_fields.includes(fieldFilter)) return true
            return false
          })
          .map((user, i) => {
            return (
              <li key={i} className={`relative px-3 mt-5 mx-1 border-l-8 ${user.is_private ? 'border-red-500' : 'border-yellow-500'}`}>
                  <h2 className='text-lg'>{user.name}</h2>
                  <ul className='flex mt-1'>
                    {user.skill_fields.map(f => <li className='px-2 py-0.5 mr-1 rounded-full bg-yellow-500 text-xs text-white'>{f}</li>)}
                  </ul>
                  <Link to={`/user/${user.id}`} className='absolute top-0 left-0 w-full h-full' state={{isPrivate}}/>
              </li>
            )
          }
        )}
      </ul>
    </Layout>
  )
}

const Heading = ({text}) => (
  <h2 className='mt-7 text-lg inline-block border-b-2 border-yellow-500'>{text}</h2>
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allUser(sort: { fields: [created_at], order: DESC }) {
      nodes {
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
  }
`
