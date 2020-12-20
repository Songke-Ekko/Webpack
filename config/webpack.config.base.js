// webpack.config.base.js
// 加上type在配置时会有提示
/**
 * @type {import('webpack').Configuration}
 */

module.exports = {
  entry: path.resolve(_dirname, '../src/index.tsx'),
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(_dirname, '../dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(_dirname, '../public/index.html'),
      favicon: path.resolve(_dirname, '../public/favicon.ico'),
      hash: true
    }),
    new CleanWebpackPlugin({
      dry: false,
      CleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')]
    }),
  ],
}