/**
 * @file Northwoods-ConsoleFormatted, A Formatted Console Stream for Northwoods.
 * @version 0.0.4
 * @author Adam Mill
 * @copyright Copyright 2016-2017 Adam Mill
 * @license Apache-2.0
 */
'use strict';

/**
 * Get global console object.
 * @return {console|false} The global console or false if it was not found.
 */
function getConsole() {
  return (typeof global.console === 'object' && typeof global.console.info === 'function') ? global.console : false;
}

/**
 * Defaults.
 */
const DEFAULTDATAFORMAT = ' %o';
const DEFAULTREMOVEKEYS = [ 'name', 'hostname', 'pid', 'level', 'msg', 'time', 'v' ];

/**
 * Log Levels.
 */
const TRACE	= 10;
const DEBUG	= 20;
const INFO	= 30;
const WARN	= 40;
const ERROR	= 50;
const FATAL	= 60;

/**
 * ConsoleFormattedRawStream
 */
function ConsoleFormattedRawStream() {
	this._console = getConsole();
  this._dataformat = DEFAULTDATAFORMAT;
  this._removekeys = DEFAULTREMOVEKEYS;
}
ConsoleFormattedRawStream.prototype.write = function write(rec) {
	if(!this._console) { return; }
	rec = rec || { };
	const level = rec.level;
	const args = [ '%s', rec.msg || '' ];
	let levelName;
	if(level <= DEBUG) { // Includes TRACE
		levelName = 'debug';
	} else if(level <= INFO) {
		levelName = 'info';
	} else if(level <= WARN) {
		levelName = 'warn';
	} else { // Includes ERROR & FATAL
		levelName = 'error';
	}
	// Remove all keys that don't need to be shown...
	const data = Object.keys(rec)
		.reduce((data, key) => {
			if(!this._removekeys.includes(key)) {
				data[key] = rec[key];
			}
			return data;
		}, { });
	// If there is any data left after filtering...
	if(Object.keys(data).length) {
		args.push(data);
		args[0] += this._dataformat;
	}
	this._console[levelName].apply(this._console, args);
};

/**
 * Exports.
 * @type {Object}
 */
module.exports = ConsoleFormattedRawStream;
