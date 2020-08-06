const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { html, entry, loaders } = require('./webpack.shared.config')

const plugins = [
	...html,
	new CleanWebpackPlugin({
		verbose: true,
		cleanStaleWebpackAssets: false
	}),
	new MinifyPlugin({}, { comments: false }),
	new MiniCssExtractPlugin({}),
	new CompressionPlugin({
		test: /\.(js|png|jpg|webp|css|jpeg)$/i,
		cache: true,
		algorithm: 'gzip',
		threshold: 4096,
		deleteOriginalAssets: false
	}),
	new CopyWebpackPlugin({
		patterns: [{ from: './_redirects', to: './build' }]
	}),
	new ImageminWebpWebpackPlugin({
		config: [{ test: /\.(jpe?g|png)/, options: { quality: 85 } }]
	}),
	new Webpack.DefinePlugin({
		'process.env': { NODE_ENV: JSON.stringify('production') }
	})
]

const output = {
	libraryTarget: 'umd',
	filename: '[name].js',
	path: path.resolve(__dirname, 'build')
}

const optimization = {
	minimizer: [new OptimizeCssAssets()],
	splitChunks: {
		chunks: 'all'
	}
}

module.exports = (env, argv) => ({
	mode: 'production',
	devtool: '',
	entry: entry,
	output,
	plugins,
	optimization,
	module: {
		rules: loaders(argv.mode)
	}
})
