module.exports = {
    mode: 'development',
    context: __dirname,
    entry: {
        index: "./index.jsx"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    watch: true,
    resolve: {
        extensions: [".jsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_models)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }

            }

        ]

    }

}
