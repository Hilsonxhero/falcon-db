module.exports = {
    //..
    configureWebpack: {
        plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
    },
    //...
}