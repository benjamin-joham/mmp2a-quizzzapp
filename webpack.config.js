const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require('node-sass-glob-importer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const glob = require('glob');
const path = require('path');

const themeName = 'alex';
const themeFolder = `public/wp-content/themes/${themeName}`;
const phpServerUrl = `${themeName}.localhost`

// We have multiple PHP files. Let's not write a HtmlWebPackPlugin-block for each in the plugin section manually:
var PHPfiles = glob.sync("src/*.php", []);
var PHPCopyPlugins = PHPfiles.map(function(fileName) {
  return new HtmlWebpackPlugin({
    template: fileName,
    filename: fileName.replace('src/', ''),
    hash: true,
    inject: false
  })
});

module.exports = {
  entry: { main:'./src/index.js' },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, themeFolder)
  },

  devServer: {
    contentBase: './dist'
  },

  module: {
    rules: [

      // use babel for all js files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['babel-preset-env']
          }
        }
      },

      // convert SASS to CSS, then minify and autoprefix
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // extract CSS into separate file
          "css-loader", // translates CSS into CommonJS
          "postcss-loader", // autoprefixes CSS
          { loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default
            options: {
              importer: globImporter() // allows you to use glob syntax, eg. @import 'layout/*';
            }
          }
        ]
      },

      // include fonts
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },

      // include partials (must be located in `src/partials/`)
      {
        test: /\_.*\.html$/,
        include: [path.resolve(__dirname, 'src/partials')],
        use: [{
          loader: 'html-loader'
        }]
      },
      
      // compress and include images
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          { loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          },

          {
            loader: 'image-webpack-loader',
            options: {
              // best image compression settings: https://gist.github.com/LoyEgor/e9dba0725b3ddbb8d1a68c91ca5452b5

              //png
              pngquant: {
                speed: 1,
                quality: 98,
              },
              zopfli: {
                more: true,
                iterations: 50 // very slow but more effective
              },
              //svg
              svgo: {
                plugins: [{
                  removeViewBox: false
                }]
              },
              //jpg lossless
              jpegtran: {
                progressive: true
              },
              mozjpeg: {
                quality: 80
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              gifsicle: {
                interlaced: false,
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [

    // Sync webpage via proxy-server
    new BrowserSyncPlugin(
      {
        proxy: phpServerUrl 
      },
      {
        // reload: false
      }
    ),
    // clean themes' stylesheet and js-file before each build
    new CleanWebpackPlugin([
      `${themeFolder}/*.js`,
      `${themeFolder}/style.*.css`,
    ]),

    // extract css into file
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),

    new CopyWebpackPlugin([
      { from: 'src/favicons/*', 
        to: path.resolve(__dirname, themeFolder),
        flatten: true
      },
      { from: 'src/style.css', 
        to: path.resolve(__dirname, themeFolder),
        flatten: true
      },
      { from: 'src/screenshot.png', 
        to: path.resolve(__dirname, themeFolder),
        flatten: true
      }
    ])
  ].concat(PHPCopyPlugins), // add the PHP files as defined above,

  optimization: {
    minimizer: [
      // minify js
      new UglifyJSPlugin({
        cache: true,
        parallel: true
      })
    ]
  }

}
