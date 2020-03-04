const path = require('path');
const config = require('../config/config.json');
const pluginsPath = path.resolve(__dirname, '../plugins');
const fs = require('fs');

const pkgConfig = {
  assets: ['../dist/**/*', '../config/config.json', '../package.json', '../cms/package.json', '../plugins/*/dist/**/*'],
  scripts: []
};

for (let pluginId in config.plugins) {
  const pluginPath = `${pluginsPath}/${config.plugins[pluginId].name}`
  const manifestData = require(`${pluginPath}/manifest`);
  for (let fileId in manifestData.files) {
    const file = manifestData.files[fileId];
    if (file.loader && file.loader.type.includes('backend')) {
      pkgConfig.scripts.push(path.relative(__dirname, `${pluginPath}/${file.path}`));
    }
  }
  const fileList = fs.readdirSync(pluginPath);
  for (let fileId in fileList) {
    const file = fileList[fileId];
    if (file.includes('node_modules') || file.includes('.git')) continue;
    if (fs.statSync(`${pluginPath}/${file}`).isDirectory()) {
      pkgConfig.assets.push(`${path.relative(__dirname, `${pluginPath}/${file}`)}/**/*`)
    } else {
      pkgConfig.assets.push(path.relative(__dirname, `${pluginPath}/${file}`));
    }
  }
}

console.log(pkgConfig);

module.exports = pkgConfig;
