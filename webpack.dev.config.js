const webpack = require('webpack')
const path = require('path')

const { html, entry, resolve, loaders } = require('./webpack.shared.config')

const output = {
	libraryTarget: 'umd',
	filename: '[name].dev.js',
	path: path.resolve(__dirname, 'build'),
	publicPath: '/'
}

const devServer = {
	publicPath: '/',
	stats: 'verbose',
	contentBase: path.join(__dirname, './src/static'),
	compress: false,
	inline: true,
	hot: true,
	useLocalIp: true,
	writeToDisk: false,
	historyApiFallback: true,
	watchContentBase: true,
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
		resolve: resolve(argv.mode),
		plugins: [new webpack.HotModuleReplacementPlugin(), ...html],
		optimization: {},
		module: {
			rules: loaders(argv.mode)
		}
	}
}
