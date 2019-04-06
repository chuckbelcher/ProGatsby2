import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import styled from 'styled-components'

const LISTING_QUERY = graphql`
  query BlogPostList {
    allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

const Post = styled.article`
  box-shadow: 0px 3px 10px rgba(25,17,34,0.5);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  a {
    color: #000;
    text-decoration: none;
  }
  h2 {
    margin-bottom: 0px;
  }
  h6 {
    margin-left: 5px;
    color: gray;
  }
  p {
    font-size: 0.8rem;
  }
  .read-more {
    color: blue;
    font-size: 0.8rem;
  }
`

const Listing = () => (
  <StaticQuery
    query={LISTING_QUERY}
    render={({ allMarkdownRemark }) =>
      allMarkdownRemark.edges.map(edge => (
        <Post key={edge.node.frontmatter.slug}>
          <Link to={`/posts${edge.node.frontmatter.slug}`}>
            <h2>{edge.node.frontmatter.title}</h2>
          </Link>
          <h6>{edge.node.frontmatter.date}</h6>
          <p>{edge.node.excerpt}</p>
          <Link class="read-more" to={`/posts${edge.node.frontmatter.slug}`}>Read More</Link>
        </Post>
      ))
    }
  />
)

export default Listing
