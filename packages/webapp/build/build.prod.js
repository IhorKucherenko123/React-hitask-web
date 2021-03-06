const webpack = require('webpack');
const debug = require('debug')('webapp:build:prod');
const { compileHandler } = require('@hitask/build/utils/helpers');
const webpackConfig = require('./config/webpack.config');
const tasks = require('./tasks');

tasks.cleanUp();
tasks.copyAssets();
tasks.copyAppFiles();

const compile = () =>
	new Promise((resolve, reject) => {
		debug('-'.repeat(80));
		debug('[Webpack Build]');
		debug('-'.repeat(80));
		webpack(webpackConfig, (err, stats) => {
			compileHandler(resolve, reject, err, stats);
		});
	}).catch(err => {
		console.error(err);
		process.exit(1);
	});

compile();
