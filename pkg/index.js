const path = require('path');
const fs = require('fs');
global.phantomPath = path.resolve(process.argv[0], '../phantomjs');
process.env.CONFIG_PATH = path.resolve(__dirname, '../config/config.json');
console.log(process.env.CONFIG_PATH);
require('../cms/backend/use');
