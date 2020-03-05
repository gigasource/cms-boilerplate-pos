require('giga-pkg-patches');
const { exec } = require('pkg');
const argv = ['--config', 'pkg.config.js', '--targets', 'node10-linux-x64', '--output', '../android/pos-android/app/src/main/assets/appAssets/app', 'android/index.js', '--no-bytecode', '--public', '--public-packages', '*'];
exec(argv);
