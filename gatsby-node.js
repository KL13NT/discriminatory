const webpack = require('webpack')
const path = require('path')

const {
	html,
	entry,
	resolve,
	loaders: customRules
} = require('./webpack.shared.config')

exports.onCreateWebpackConfig = ({
	stage,
	rules,
	loaders,
	plugins,
	actions
}) => {
	const mode = stage.startsWith('develop') ? 'development' : 'production'

	actions.setWebpackConfig({
		resolve
	})
}
