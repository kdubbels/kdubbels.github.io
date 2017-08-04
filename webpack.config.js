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
    }
};