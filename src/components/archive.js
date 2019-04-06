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
`


const Archive = () => (
  <StaticQuery
    query={POST_ARCHIVE_QUERY}
    render={({ allMarkdownRemark }) => (
      <>
        <aside>
          <h3>Archive</h3>
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
