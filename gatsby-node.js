const { resolve } = require('./webpack.shared.config')

exports.onCreateWebpackConfig = ({ stage, actions }) => {
	const mode = stage.startsWith('develop') ? 'development' : 'production'

	actions.setWebpackConfig({
		resolve: resolve(mode)
	})
}

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions

	const legalTemplate = require.resolve('./src/templates/legal.jsx')

	const result = await graphql(`
		{
			allMarkdownRemark {
				edges {
					node {
						frontmatter {
							title
							path
							subtitle
							date
						}
					}
				}
			}
		}
	`)

	if (result.errors) {
		reporter.panicOnBuild('Error while running GraphQL query.')
		return
	}

	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		createPage({
			path: node.frontmatter.path,
			component: legalTemplate,
			context: {}
		})
	})
}
