const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
// const ImageminPlugin = require('imagemin-webpack-plugin').default
// const imageminMozjpeg = require('imagemin-mozjpeg')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

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

	// NOTE: Netlify's CDNs automatically compress assets, we don't need to gzip on build
	new CompressionPlugin({
		test: /\.(js|png|jpg|webp|css|jpeg)$/i,
		cache: true,
		threshold: 244,
		deleteOriginalAssets: false
	}),

	new ImageminWebpWebpackPlugin({
		config: [
			{
				test: /\.(jpe?g|png)/,
				options: {
					quality: 80
				}
			}
		]
	}),
	new InjectManifest({
		swSrc: './src/sw.js',
		swDest: 'sw.js'
	})
]

const output = {
	path: path.resolve(__dirname, './public'),
	publicPath: '/'
}

const optimization = {
	minimize: true,
	minimizer: [
		new OptimizeCssAssets(),
		new TerserPlugin({
			test: /\.js(\?.*)?$/i
		})
	],
	splitChunks: {
		chunks: 'all'
	}
}

module.exports = (env, argv) => ({
	mode: 'production',
	devtool: '',
	entry,
	output,
	plugins,
	optimization,
	resolve: resolve(argv.mode),
	module: {
		rules: loaders(argv.mode)
	}
})
