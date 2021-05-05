module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .tap((options) => Object.assign({}, options, { name: "[name].[ext]" }));

    config.module
      .rule("images")
      .use("url-loader")
      .loader("file-loader") // replaces the url-loader
      .tap((options) =>
        Object.assign(options, {
          name: "images/[name].[ext]",
        })
      );
    config.module
      .rule("svg")
      .use("file-loader")
      .tap((options) =>
        Object.assign(options, {
          name: "images/register/[name].[ext]",
        })
      );
  },
  css: {
    extract: {
      filename: "css/[name].css",
      chunkFilename: "css/[name].css",
    },
  },
  configureWebpack: {
    output: {
      filename: "js/[name].js",
      chunkFilename: "js/[name].js",
    },
  },
  pwa: {
    name: "My Finances",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      // cleanupOutdatedCaches: true,
      skipWaiting: true,
    },
  },
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 8080, // CHANGE YOUR PORT HERE!
  //   https: true,
  // },
};
