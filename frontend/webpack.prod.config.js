const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: 'production',
	devtool: '',

	entry: {
		index: path.resolve(__dirname, './src/index.js')
	},

	output: {
		libraryTarget: 'umd',
		filename: '[name].prod.js',
		path: path.resolve(__dirname, 'build')
	},

	devServer: {
		compress: true,
		contentBase: path.join(__dirname, 'public'),
		publicPath: '/',
		historyApiFallback: true,
		hot: false,
		useLocalIp: true,
		watchContentBase: true,
		writeToDisk: false,
		host: '0.0.0.0'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/i,
				exclude: path.resolve(__dirname, 'node_modules'),
				use: ['babel-loader']
			},
			{
				test: /\.module\.sass$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[hash:base64:5]',
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
					MiniCssExtractPlugin.loader,
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
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/en/index.pug',
			inject: 'body'
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/ar/index.pug',
			inject: 'body'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.pug', //in order to include multiple templates make sure to use multiple instances of the plugin
			inject: 'body'
		}),
		new CompressionPlugin({
			test: /\.(js|png|jpg|webp|css|jpeg)$/i,
			cache: true,
			algorithm: 'gzip',
			threshold: 4096,
			deleteOriginalAssets: false
		}),
		new ImageminPlugin({
			minFileSize: 2024 * 20,
			pngquant: { quality: '40-40' },
			plugins: [imageminMozjpeg({ quality: 30 })]
		}),
		new ImageminWebpWebpackPlugin({
			config: [{ test: /\.(jpe?g|png)/, options: { quality: 60 } }]
		}),
		new CopyWebpackPlugin([{ from: './static/', to: './' }])
	],

	optimization: {
		minimizer: [
			new OptimizeCssAssets(),
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false
			})
		],
		splitChunks: {
			chunks: 'all'
		}
	}
}
