const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const resolve = (p) => path.resolve(__dirname, p)
const {VueLoaderPlugin}  = require('vue-loader/lib/index')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js'
    },
    cache: {
        type: "memory" // filessystem memory
    },
    output: {
        path: resolve('./dist'),
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    resolve: {
        extensions: [".vue", ".js", "json"],
        alias: {
            vue$: "vue/dist/vue.esm.js",
            "@": resolve("src"),
            crypto: false,
            stream: false,
            assert: false,
            http: false
        }
    },
    devServer: {
        port: 8086,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Method": "GET,POST,PUT,OPTIONS"
        }
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new VueLoaderPlugin(),
        new ModuleFederationPlugin({
            name: "main_app",
            filename: "remoteEntry.js",
            remotes: {
                lib_remote: "lib_remote@http://localhost:8085/remoteEntry.js",
            },
            shared: {
                vue: {
                    eager: true,
                    singleton: true,
                }
            }
        })
    ]
}