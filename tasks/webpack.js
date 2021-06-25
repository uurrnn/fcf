const path = require("path");
const webpack = require("webpack");
const colors = require("colors/safe");
const devMode = process.env.NODE_ENV !== "production";

import { config, configHelper } from '../config.js';

const distFolder = `${ configHelper.buildJsPath() }`;

const webpackConfig = {
   context: path.resolve(__dirname, `..${ configHelper.srcPath() }`),
   stats: {
      children: false
   },

   entry: {
      main: [
         `.${ config.folders.js.src }/main.js`,
         //'webpack/hot/dev-server',
         //'webpack-hot-middleware/client',
      ]
   },
   mode: devMode ? "development" : "production",
   output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, `..${ distFolder }/`),
      publicPath: path.resolve(__dirname, `..${ distFolder }/`),
   },
   devtool: devMode ? "inline-source-map" : false,
   plugins: [new webpack.HotModuleReplacementPlugin()],
   resolve: {
      extensions: [".js"],
      modules: ["node_modules"]
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader"
            }
         },
         {
            test: /\.(sass|css)$/,
            loaders: ['style-loader', 'css-loader']
          }
      ]
   }
};

function scripts() {
   return new Promise(resolve =>
      webpack(webpackConfig, (err, stats) => {
         if (err) {
            console.log(colors.red("Webpack"), colors.red(err));
         }

         console.log(
            colors.green(
               stats.toString({
                  /* stats options */
               })
            )
         );

         resolve();
      })
   );
}

module.exports = { webpackConfig, scripts };
