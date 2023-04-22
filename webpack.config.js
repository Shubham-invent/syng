const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./bin/server",
  mode: "production",
  target: "node",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".js"],
  },
  stats: {
    colors: true,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./ecosystem.config.js", to: "./" }],
    }),
  ],
};
