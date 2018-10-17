
//Input file path is relative
//Output file path is absolute
const path = require("path");
module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.join(__dirname, "public"),
    filename:"bundle.js"
  },

 
  module: {
    rules: [

    //Rule for treating JS like JSX
    //Ignore /node_modules/, which is already in ES5
    {
      loader: "babel-loader",
      test: /\.js$/, //Regex to identify all .js files
      exclude: /node_modules/
    }, 

    //Rule for CSS
    {
      test: /\.s?css$/,

      //"use" allows us to specify an array of loaders
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },

  //This sets up 'source maps' to aid in debugging
  devtool: 'cheap-module-eval-source-map',

  //Sets up devServer
  //Mandatory argument: contentBase, which specifies the material our server needs to run
  devServer: {
    contentBase: path.join(__dirname, "public")
  }
};