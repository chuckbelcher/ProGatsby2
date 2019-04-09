/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { StaticQuery, graphql } from "gatsby"
import Helmet from 'react-helmet';
import { Spring } from 'react-spring/renderprops';
import Img from 'gatsby-image'

import Header from "./header"
import Archive from "./archive"
import "./layout.css"

const MainLayout = styled.main`
  max-width: 90%;
  margin: 0px;
  margin-left: 10px;
  display: grid;
  grid-template-columns: 4fr  1fr;
  grid-gap: 40px;
`

const MainImage = styled.main`
  margin: 10px;
  margin-top: 0px;
`

const MainFooter = styled.main`
  height: 30px;
  background: #524763;
  color: white;
  
  a {
    text-decoration: underline;
    color: white;
  }
  .footer {
    margin-left: 10px;
  }
`

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
        file(relativePath: { regex: "/bg/" }) {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: "description",
              content: data.site.siteMetadata.description,
            },
            { name: "keywords", content: "sample, something" },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Spring 
          from={{ height: location.pathname === "/" ? 100 : 200 }} 
          to={{ height: location.pathname === "/" ? 200 : 100 }}>
          {styles => (
            <MainImage style={{ overflow: "hidden", ...styles }}>
              <Img fluid={data.file.childImageSharp.fluid} />
            </MainImage>
          )}
        </Spring>
        <MainLayout>
          <div>{children}</div>
          <Archive />
        </MainLayout>
        <MainFooter>
          <footer class="footer">
            © {new Date().getFullYear()}, Built by
            {` `}
            <a href="https://www.pateogroup.com">Pateo Group</a>
          </footer>
        </MainFooter>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  location: {},
}

export default Layout
