const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const entry = {
	index: path.resolve(__dirname, './src/index.js')
}

const html = [
	new HtmlWebpackPlugin({
		template: './src/index.pug',
		chunks: ['index']
	})
]

const jsWithSourceMap = [
	{ loader: 'babel-loader', options: { cacheDirectory: true } },
	{
		loader: 'source-map-loader'
	}
]

const jsWithoutSourceMap = [
	{ loader: 'babel-loader', options: { cacheDirectory: true } }
]

const jsLoaders = mode => [
	{
		test: /\.jsx?$/i,
		exclude: path.resolve(__dirname, 'node_modules/'),
		use: jsWithSourceMap,
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
					sourceMap: true,
					modules: {
						localIdentName:
							mode === 'development'
								? '[local]___[hash:base64:5]'
								: '[hash:base64:5]',
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
					sourceMap: true,
					modules: false
				}
			},
			'postcss-loader',
			'sass-loader'
		]
	},

	{
		test: /\.css$/i,
		use: [
			mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					modules: false
				}
			},
			'postcss-loader'
		]
	},

	{
		test: /\.tokens\.sass$/i,
		use: [
			mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
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
		test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|mp4)$/i,
		use: 'file-loader'
	}
]

const themeLoaders = mode => [
	{
		type: 'javascript/auto',
		test: /\.theme\.sass$/,
		use: [
			mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					modules: false
				}
			},
			'postcss-loader',
			'sass-loader'
		]
	}
]

const localeLoaders = [
	{
		type: 'javascript/auto',
		test: /\.json$/,
		include: path.resolve(__dirname, './src/lang'),
		use: [
			{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			}
		]
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
	...themeLoaders(mode),
	...fileLoaders,
	...svgLoaders,
	...htmlLoaders,
	...pugLoaders,
	...localeLoaders
]

const resolve = mode => ({
	alias: {
		config: path.join(__dirname, './', mode || 'development')
	}
})

module.exports = {
	entry,
	html,
	resolve,
	loaders
}
