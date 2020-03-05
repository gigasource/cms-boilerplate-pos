const path = require('path');
process.env.CONFIG_PATH = path.resolve(__dirname, '../config/config.json');
console.log(process.env.CONFIG_PATH);
require('../cms/backend/use');
