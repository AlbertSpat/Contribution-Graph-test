const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/script.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		assetModuleFilename: '[path][name][ext]',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.(scss|css)$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|svg)$/i,
				type: 'asset/resource',
			},
		],
	},
	devServer: {
		port: 3000,
		static: './',
	},
}
