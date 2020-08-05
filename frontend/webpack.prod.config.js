const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

// const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
// const ImageminPlugin = require('imagemin-webpack-plugin').default
// const imageminMozjpeg = require('imagemin-mozjpeg')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: 'production',
	devtool: '',

	entry: {
		index: path.resolve(__dirname, './src/index.js'),
		pages: path.resolve(__dirname, './src/pages/index.js')
	},

	output: {
		libraryTarget: 'umd',
		filename: '[name].js',
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
				use: ['babel-loader'],
				resolve: { extensions: ['.js', '.jsx'] }
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
				test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf)$/i,
				use: 'file-loader'
			},

			{
				test: /\.(svg)$/i,
				// import default, {ReactComponent as SVGComponent} from '<img>'
				use: ['@svgr/webpack', 'file-loader']
			},

			{
				test: /\.html/i,
				use: 'html-loader'
			},
			{
				test: /\.pug/i,
				use: ['pug-loader']
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin({
			verbose: true,
			cleanStaleWebpackAssets: false
		}),
		new MinifyPlugin({}, { comments: false }),
		new MiniCssExtractPlugin({}),
		new HtmlWebpackPlugin({
			template: './src/pages/en/index.pug',
			filename: 'en.html',
			excludeChunks: ['js'],
			chunks: ['css']
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/ar/index.pug',
			filename: 'ar.html',
			excludeChunks: ['js'],
			chunks: ['css']
		}),
		new HtmlWebpackPlugin({
			template: './src/index.pug'
		}),
		new CompressionPlugin({
			test: /\.(js|png|jpg|webp|css|jpeg)$/i,
			cache: true,
			algorithm: 'gzip',
			threshold: 4096,
			deleteOriginalAssets: false
		}),
		// new HtmlWebpackExcludeAssetsPlugin(),
		// new ImageminPlugin({
		// 	minFileSize: 2024 * 20,
		// 	pngquant: { quality: '40-40' },
		// 	plugins: [imageminMozjpeg({ quality: 85 })]
		// }),
		new ImageminWebpWebpackPlugin({
			config: [{ test: /\.(jpe?g|png)/, options: { quality: 85 } }]
		}),
		new Webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify('production') }
		})
	],

	optimization: {
		minimizer: [new OptimizeCssAssets()],
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				js: {
					test: /js$/
				},
				css: {
					test: /css/
				}
			}
		}
	}
}
