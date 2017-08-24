var webpack = require('webpack');

module.exports = {
    entry: ["babel-polyfill","./src/index.js"],
    output: {
        filename: "./scripts/bundle.js"
    },
    module: {
        loaders: [
            {
                exclude: /(node_modules|server.js)/,
                loader: 'babel-loader',
                    query:
                    {
                      presets:['react', 'es2015']
                    }
            }
        ]
    },
    plugins: [
    new webpack.DefinePlugin({ //<--key to reduce React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
};