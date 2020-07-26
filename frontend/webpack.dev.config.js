const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development',
	devtool: 'source-map',

	entry: {
		index: path.resolve(__dirname, './src/index.js')
	},

	output: {
		libraryTarget: 'umd',
		filename: '[name].dev.js',
		path: path.resolve(__dirname, 'build_dev'),
		publicPath: '/'
	},

	devServer: {
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
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/i,
				exclude: path.resolve(__dirname, 'node_modules/'),
				use: [
					'babel-loader',
					{
						loader: 'source-map-loader'
					}
				]
			},

			{
				test: /\.module\.sass$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]___[hash:base64:5]',
								mode: 'local'
							}
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			},

			{
				test: /\.global\.sass$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: false
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			},

			{
				test: /\.tokens\.sass$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: false
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			},

			{
				test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf)$/i,
				use: 'file-loader'
			},

			{
				test: /\.(svg)$/i,
				use: ['@svgr/webpack', 'file-loader'] // this provies startUrl when importing, and ReactComponent as inline
			},

			{
				test: /\.html/i,
				use: 'html-loader'
			},

			{
				test: /\.pug/i,
				use: ['html-loader', 'pug-html-loader']
			}
		]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/pages/en/index.pug', //in order to include multiple templates make sure to use multiple instances of the plugin
			inject: 'body'
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/ar/index.pug', //in order to include multiple templates make sure to use multiple instances of the plugin
			inject: 'body'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.pug', //in order to include multiple templates make sure to use multiple instances of the plugin
			inject: 'body'
		})
	],

	optimization: {}
}
