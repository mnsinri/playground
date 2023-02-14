const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/react"] },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias : {
      "@components": path.resolve(__dirname, 'src/components'),
      "@styles": path.resolve(__dirname, 'src/styles'),
      "@routes": path.resolve(__dirname, 'src/routes'),
      "@hooks": path.resolve(__dirname, 'src/hooks'),
      "@src": path.resolve(__dirname, 'src'),
    }
  },
  target: "web",
};
