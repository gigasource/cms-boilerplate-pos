'use strict';
var electron = require('electron');
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var app = electron.app, BrowserWindow = electron.BrowserWindow, Menu = electron.Menu;
var mainWindow;
var appProcess;
var mongodProcess;
const arr = ['--dbpath=./data', '--syncdelay', '2', '--setParameter', 'diagnosticDataCollectionEnabled=true', '--storageEngine=mobile', '--bind_ip_all', '--port', '27100'];
// ./mongod --nounixsocket --dbpath=./data --storageEngine=mobile

process.on("exit", () => {
  appProcess.kill('SIGINT');
  mongodProcess.kill('SIGINT');
});
process.on("close", () => {
  appProcess.kill('SIGINT');
  mongodProcess.kill('SIGINT');
});

function start() {
  console.log('log: ', process.cwd());
  // assert(false, path.resolve(process.argv[0], '../../../../app_built'));
  mongodProcess = require('child_process').spawn(path.resolve(process.argv[0], '../resources/app/mongod.exe'), arr);
  appProcess = require('child_process').spawn(path.resolve(process.argv[0], '../resources/app/app.exe'), []);
  appProcess.on('close', function () {
    appProcess.kill('SIGINT');
  });
  appProcess.on('exit', function () {
    start();
  });
  mongodProcess.stdout.on('data', (data) => {
    fs.appendFileSync(path.resolve(process.argv[0], '../log_electron_mongo.txt'), data, 'utf-8');
  });
  mongodProcess.stderr.on('data', (data) => {
    fs.appendFileSync(path.resolve(process.argv[0], '../log_electron_mongo.txt'), data, 'utf-8');
  });
  appProcess.stdout.on('data', (data) => {
    fs.appendFileSync(path.resolve(process.argv[0], '../log_electron.txt'), data, 'utf-8');
  });
  appProcess.stderr.on('data', (data) => {
    fs.appendFileSync(path.resolve(process.argv[0], '../log_electron.txt'), data, 'utf-8');
  })
}

start();

Menu.setApplicationMenu(null);
app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.resolve(process.argv[0], '../icon.ico')
  });
  mainWindow.maximize();
  mainWindow.setFullScreen(true);
  setTimeout(function () {
    mainWindow.loadURL(`http://localhost:8888/view/pos-login`);
  }, 3000)
});
