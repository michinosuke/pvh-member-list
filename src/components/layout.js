import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="max-w-4xl relative mx-auto min-h-screen pb-20" data-is-root-path={isRootPath}>
      <header className="py-2 bg-yellow-500 text-white text-xl text-center"><h1>{header}</h1></header>
      <main className=''>{children}</main>
      <footer className="bottom-0 absolute w-full py-2 bg-yellow-500 text-white text-xs text-center">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
