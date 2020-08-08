const webpack = require('webpack')
const path = require('path')

const { html, entry, loaders } = require('./webpack.shared.config')

const output = {
	libraryTarget: 'umd',
	filename: '[name].dev.js',
	path: path.resolve(__dirname, 'build'),
	publicPath: '/'
}

const devServer = {
	compress: false,
	contentBase: path.join(__dirname, './src/static'),
	publicPath: '/',
	inline: true,
	historyApiFallback: true,
	hot: true,
	watchContentBase: true,
	writeToDisk: false,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
		'Access-Control-Allow-Headers':
			'X-Requested-With, content-type, Authorization'
	}
}

module.exports = (env, argv) => {
	return {
		mode: 'development',
		devtool: 'source-map',
		entry,
		output,
		devServer,
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			...html,
			new webpack.DefinePlugin(
				Object.keys(env).reduce((prev, next) => {
					prev[`process.env.${next}`] = JSON.stringify(env[next])
					return prev
				}, {})
			)
		],
		optimization: {},
		module: {
			rules: loaders(argv.mode)
		}
	}
}
