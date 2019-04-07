import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components'


const POST_ARCHIVE_QUERY = graphql`
  query BlogPostArchiven {
    allMarkdownRemark(
      limit: 5
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`

const ArchiveList = styled.ul`
  a {
    color: #524763;
    text-decoration: none;
  }
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 10px;
`

const ArchiveTitle = styled.h2`
  margin-top: 15px;
  margin-left: 10px;
`


const Archive = () => (
  <StaticQuery
    query={POST_ARCHIVE_QUERY}
    render={({ allMarkdownRemark }) => (
      <>
        <aside>
          <ArchiveTitle>Archive</ArchiveTitle>
          <ArchiveList>
            {allMarkdownRemark.edges.map(edge => (
              <li key={edge.node.frontmatter.slug}>
                <Link to={`/posts${edge.node.frontmatter.slug}`}>{edge.node.frontmatter.title}</Link>
              </li>
            ))}
          </ArchiveList>
        </aside>
      </>
    )}
  />
)


export default Archive
