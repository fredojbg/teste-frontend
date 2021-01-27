const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let templateHtmlDir = '../src/templates';


// This function that generates our html plugins
function generateHtmlPlugins() {
  let templateFiles = fs.readdirSync(path.resolve(__dirname, templateHtmlDir));

  return templateFiles.map((item) => {
    return new HtmlWebpackPlugin({
      filename: `home.html`,
      template: `${'./src/templates'}/home.html`,
      minify: false,
    });
  });
}

module.exports = { generateHtmlPlugins };
