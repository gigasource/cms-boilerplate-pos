require('giga-pkg-patches');
const { exec } = require('pkg');
const argv = ['--config', 'pkg.config.js', '--targets', 'node10-win32-x64', '--output', '../electron/app', 'win32/index.js', '--no-bytecode', '--public' , '--public-packages', '*'];
exec(argv);
