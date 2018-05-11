module.exports = {
    entry: './src/js/main.js',
    output: {
        filename: './dist/js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};
