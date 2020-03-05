const path = require('path');
global.phantomPath = path.resolve(process.argv[0], '../phantomjs');
require('../common-index');
