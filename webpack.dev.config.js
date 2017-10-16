const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	entry: {
		city: './src/index.js'
	},
	output: {
		path: __dirname,
		filename: `./dist/[name].min.js`,
	},
	devServer: {
		hot: false,
		contentBase: __dirname,
		publicPath: '/'
	},
	module: {
		loaders: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({ filename: 'dist/city.min.css', allChunks: true })
	]
}

module.exports = config