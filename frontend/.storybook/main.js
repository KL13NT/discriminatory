const path = require('path')
const custom = require('../webpack.dev.config')

module.exports = {
	stories: ['../src/**/*.stories.(js|mdx)'],
	addons: [
		'storybook-svgr-react-component',
		'@storybook/addon-storysource',
		'@storybook/addon-docs',
		'@storybook/addon-knobs/register',
		'@storybook/addon-actions/register',
		'@storybook/addon-a11y/register',
		'@storybook/addon-viewport/register'
	],
	webpackFinal: config => {
		return {
			...config,
			module: {
				...config.module,
				rules: custom.module.rules.map(rule => {
					if (Array.isArray(rule.use) && rule.use.includes('babel-loader'))
						rule.use.push(require.resolve('@storybook/source-loader'))

					return rule
				})
			}
		}
	}
}
