const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // mod 19 act 28
      // webpack plugin that generates HTML file and creates bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Just Another Text Editor",
        // add favicon property
        favicon: "./favicon.ico",
      }),

      // Inject service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      // create manifest.json file  //provides metadata about your web app, allowing browsers to install it as a native app on users' devices
      new WebpackPwaManifest({
        fingerprints: false, //fingerprinting can prevent caching issues, but complicates deployment/versioning
        inject: true, //ensures that the browser can access the manifest and install the PWA
        name: "Just Another Text Editor", //basic metadata for the app
        short_name: "J.A.T.E.", //metadata
        description: "Take notes with JavaScript syntax highlighting!", //metadata
        background_color: "#225ca3", //metadata
        theme_color: "#225ca3", //metadata
        orientation: "portrait", //metadata
        display: "standalone", //metadata
        start_url: "./", //metadata
        publicPath: "./", //metadata
        icons: [
          {
            // store logo in bundled assets
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], //different sizes for different platforms
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      // define how js/css files are processed during the build
      rules: [
        {
          test: /\.css$/i, //match all css files
          use: ["style-loader", "css-loader"], //use loaders to transform css files before adding to the bundle
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/, //exclude node modules folder
          // configure the babel loader for use with EcmaScript 6
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
