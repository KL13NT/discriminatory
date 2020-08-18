const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssets = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { html, entry, loaders } = require('./webpack.shared.config')

const plugins = [
	...html,
	new MiniCssExtractPlugin({}),

	new CopyWebpackPlugin({
		patterns: [{ from: './_redirects', to: './build' }]
	}),
	new Webpack.DefinePlugin({
		'process.env': { NODE_ENV: JSON.stringify('production') }
	}),

	new CleanWebpackPlugin({
		verbose: true,
		cleanStaleWebpackAssets: false
	}),

	new MinifyPlugin({}, { comments: false }),
	new CompressionPlugin({
		test: /\.(js|png|jpg|webp|css|jpeg)$/i,
		cache: true,
		algorithm: 'gzip',
		threshold: 244,
		deleteOriginalAssets: false
	}),
	new ImageminPlugin({
		minFileSize: 2024 * 20,
		pngquant: { quality: '65-80' },
		plugins: [imageminMozjpeg({ quality: 75 })]
	}),
	new ImageminWebpWebpackPlugin({
		config: [{ test: /\.(jpe?g|png)/, options: { quality: 85 } }]
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
