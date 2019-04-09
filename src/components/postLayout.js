import React, { Component } from 'react';
import { graphql } from 'gatsby'
import Layout from './layout'


export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        slug
      }
      html
    }
  }
`
export default class postLayout extends Component {
    render() {
        const { markdownRemark } = this.props.data;
        const { location } = this.props;

        return (
          <Layout location={location}>
            <h1>{markdownRemark.frontmatter.title}</h1>
            <h6>Created On: {markdownRemark.frontmatter.date}</h6>
            <div
              dangerouslySetInnerHTML={{
                __html: markdownRemark.html,
              }}
            />
          </Layout>
        )
    }
}

