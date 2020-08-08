const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const entry = {
	index: path.resolve(__dirname, './src/index.js'),
	pages: path.resolve(__dirname, './src/pages/index.js')
	// registration: path.resolve(__dirname, './src/pages/registration.js')
}

const html = [
	new HtmlWebpackPlugin({
		template: './src/pages/en/index.pug',
		filename: 'en/index.html',
		excludeChunks: ['index'],
		chunks: ['pages']
	}),
	new HtmlWebpackPlugin({
		template: './src/pages/ar/index.pug',
		filename: 'ar/index.html',
		excludeChunks: ['index'],
		chunks: ['pages']
	}),
	// new HtmlWebpackPlugin({
	// 	template: './src/pages/ar/register.pug',
	// 	filename: 'ar/register/index.html',
	// 	excludeChunks: ['index', 'pages']
	// }),
	// new HtmlWebpackPlugin({
	// 	template: './src/pages/en/register.pug',
	// 	filename: 'en/register/index.html',
	// 	excludeChunks: ['index', 'pages']
	// }),
	// new HtmlWebpackPlugin({
	// 	template: './src/pages/ar/login.pug',
	// 	filename: 'ar/login/index.html',
	// 	excludeChunks: ['index', 'pages']
	// }),
	// new HtmlWebpackPlugin({
	// 	template: './src/pages/en/login.pug',
	// 	filename: 'en/login/index.html',
	// 	excludeChunks: ['index', 'pages']
	// }),
	new HtmlWebpackPlugin({
		template: './src/index.pug',
		excludeChunks: ['pages'],
		chunks: ['index']
	})
]

const jsLoaders = mode => [
	{
		test: /\.jsx?$/i,
		exclude: path.resolve(__dirname, 'node_modules/'),
		use: [
			{ loader: 'babel-loader', options: { cacheDirectory: true } },
			{
				loader: mode === 'development' ? 'source-map-loader' : undefined
			}
		],
		resolve: { extensions: ['.js', '.jsx'] }
	}
]

const sassLoaders = mode => [
	{
		test: /\.module\.sass$/i,
		use: [
			mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
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
			mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
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
			mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					modules: false
				}
			},
			'postcss-loader',
			'sass-loader'
		]
	}
]

const fileLoaders = [
	{
		test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf)$/i,
		use: 'file-loader'
	}
]

const svgLoaders = [
	{
		test: /\.(svg)$/i,
		use: ['@svgr/webpack', 'file-loader'] // this provies startUrl when importing, and ReactComponent as inline
	}
]

const htmlLoaders = [
	{
		test: /\.html/i,
		use: 'html-loader'
	}
]

const pugLoaders = [
	{
		test: /\.pug/i,
		use: ['pug-loader']
	}
]

const loaders = mode => [
	...jsLoaders(mode),
	...sassLoaders(mode),
	...fileLoaders,
	...svgLoaders,
	...htmlLoaders,
	...pugLoaders
]

module.exports = {
	entry,
	html,
	loaders
}
