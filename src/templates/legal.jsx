import React from 'react'
import { graphql } from 'gatsby'

import styles from './legal.module.sass'
import { SEO } from '../views/components/SEO'

export default function Legal({ data }) {
	if (!data || !data.markdownRemark) return null

	const { markdownRemark } = data
	const { frontmatter, html } = markdownRemark

	return (
		<div className={styles.page}>
			<SEO
				title={frontmatter.title}
				path={`/${frontmatter.path}`}
				description={frontmatter.subtitle}
			/>
			<header>
				<div>
					<h1>{frontmatter.title}</h1>
					<h2>{frontmatter.subtitle}</h2>
					<h2>Last updated {frontmatter.date}</h2>
				</div>
			</header>
			<article dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	)
}

export const pageQuery = graphql`
	query($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				date(formatString: "MMMM DD, YYYY")
				title
				subtitle
			}
		}
	}
`
