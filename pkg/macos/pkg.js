require('giga-pkg-patches');
const { exec } = require('pkg/index');
const argv = ['--config', 'pkg.config.js', '--targets', 'node10-macos-x64', '--output', 'out/app', 'index.js', '--no-bytecode', '--public' , '--public-packages'];
exec(argv);
