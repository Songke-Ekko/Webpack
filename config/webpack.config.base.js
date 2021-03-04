// 不希望涉及到的路径和执行 webpack 路径时的具体路径相关，而是希望相对于配置文件的路径，要用到 path
const path = require('path');

// webpack.config.base.js
// 加上type在配置时会有提示
/**
 * @type {import('webpack').Configuration}
 */

module.exports = {
  // 入口文件，打包的文件
  // _dirname 获得当前模块文件所在目录的完整绝对路径
  // path.resolve() 是 path.resolve([from...], to)
  // 若字符以 / 开头，则最后返回的路径，不会拼接前面的路径，若是以 ../ 开头，则会把前面的路径拼上，但是不包含前面路径的最后一节路径
  // path.resolve(_dirname, '../src/index.tsx') 是在 _dirname 父目录下执行 ../src/index.tsx
  // path.resolve(_dirname, './src/index.tsx') 是在 _dirname 目录下执行 ../src/index.tsx
  // path.resolve(_dirname, '/src/index.tsx') 则和 _dirname 无关，直接在根目录执行 ../src/index.tsx
  // path.resolve(_dirname, 'src/index.tsx') 则和_dirname无关，直接执行 src/index.tsx 的目录

  // 对象类型的 entry
  // entry: {
  //   <key>: <value>
  // }
  // key 是最简单的字符串，对应的是 output.filename 配置中的 [name] 变量

  // entry: {
  //   'app-entry': './app.js'
  // }
  // output: {
  //   path: './output',
  //   filename: '[name].js'
  // }
  // 最后打包成 output 文件夹下的 app-entry 文件

  entry: path.resolve(_dirname, '../src/index.tsx'),

  // 出口文件，打包后生成的文件以及路径

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(_dirname, '../dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  // plugins 不是直接操作单个文件，而是对于整个构建过程的作用
  // ① HtmlWebpackPlugin: 
  // 作用是依据一个简单的模板，最后生成一个最终的 Html5 文件，这个文件自动引用了打包后的 JS 文件。每次编译都在文件名中插入一个不同的 hash 值
  // 移除 public 文件夹，利用此插件，HTML5 文件会自动生成，此外 CSS 已经通过前面的操作打包到 JS 中了
  // 在 app 目录下，创建一个 HTML 文件模板 index.temp.html，这个模板包含 title 等其它需要的元素，在编译过程中，本插件会依据此模板生成最终的 HTML
  // 页面，会自动添加所依赖的 css, js, favicon 等文件。

  // ② Hot Module Replacement(HMR): 
  // 在修改组件代码中， 自动刷新实时预览修改后的效果
  // (1) 在 webpack 配置文件中添加 HMR 插件
  // (2) 在 Webpack Dev Server 中添加 'hot' 参数

  // ③ babel-loader
  // ES6 转 ES5

  // ④ mini-css-extract-plugin
  // 将所有的样式 css, less, scss 打包成一个 css 文件，common.css ，并且 link 进页面里面

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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  // Loaders 是在打包构建过程中用来处理源文件的 (JSX, Scss, Less)，一次只能处理一个
  module: {
    loaders:[
      { 
        test: /\.tpl$/, 
        loader: 'ejs-loader?variable=data'
      },
    ],
    rules: [{
      test: /\.jsx?$/,
      exclude: path.join(__dirname, 'node_modules'),
      use: ['babel-loader'],
    }]
  },
}