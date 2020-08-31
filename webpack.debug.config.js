const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin')

const { html, entry, resolve, loaders } = require('./webpack.shared.config')

const plugins = [
	...html,
	// new FaviconsWebpackPlugin('./src/assets/logo_small.svg'),
	new MiniCssExtractPlugin({}),

	new CopyWebpackPlugin({
		patterns: [{ from: './_redirects' }]
	}),

	new CleanWebpackPlugin({
		verbose: true,
		cleanStaleWebpackAssets: false
	}),

	// new MinifyPlugin({}, { comments: false }),

	// NOTE: Netlify's CDNs automatically compress assets, we don't need to gzip on build
	// new CompressionPlugin({
	// 	test: /\.(js|png|jpg|webp|css|jpeg)$/i,
	// 	cache: true,
	// 	threshold: 244,
	// 	deleteOriginalAssets: false
	// }),

	// new ImageminWebpWebpackPlugin({
	// 	config: [
	// 		{
	// 			test: /\.(jpe?g|png)/,
	// 			options: {
	// 				quality: 80
	// 			}
	// 		}
	// 	]
	// }),
	new GenerateSW({
		clientsClaim: true,
		skipWaiting: true
	}),
	new webpack.debug.ProfilingPlugin()
	// new InjectManifest({
	// 	swSrc: './src/sw.js'
	// })
]

const output = {
	filename: '[name].js',
	path: path.resolve(__dirname, './build'),
	publicPath: '/'
}

const optimization = {
	// minimizer: [new OptimizeCssAssets()],
	splitChunks: {
		chunks: 'all'
	}
}

module.exports = (env, argv) => ({
	mode: 'development',
	devtool: 'source-map',
	entry,
	output,
	plugins,
	optimization,
	resolve: resolve('production'),
	module: {
		rules: loaders('production')
	}
})
