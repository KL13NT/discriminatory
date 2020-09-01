module.exports = {
	pathPrefix: '/',
	siteMetadata: {
		title: 'Discriminatory',
		description: 'Together to end discrimination',
		author: '@Nabil_Tharwat16',
		siteUrl: 'https://discriminatorynetwork.netlify.app'
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		'gatsby-plugin-sass',
		{
			resolve: 'gatsby-plugin-react-intl',
			options: {
				path: `${__dirname}/src/lang`,
				languages: ['en', 'ar'],
				defaultLanguage: 'en',
				redirect: false,
				redirectDefaultLanguageToRoot: false,
				ignoredPaths: ['./src/docs']
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'docs',
				path: `${__dirname}/src/docs`
			}
		},
		'gatsby-transformer-remark'
	]
}
