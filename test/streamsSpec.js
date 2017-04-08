/**
 * test/streamsSpec.js
 */
'use strict';

/**
 * Imports.
 */
const expect = require('expect.js');
const sinon = require('sinon');
const ConsoleFormattedRawStream = require('../index');

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
 * Tests.
 */
describe('Northwoods', () => {
	describe('ConsoleFormatted', () => {
		describe('ConsoleFormattedRawStream', () => {
			it('should be a class', () => {
				expect(ConsoleFormattedRawStream).to.be.a('function');
				expect(ConsoleFormattedRawStream.length).to.be(0);
				expect(ConsoleFormattedRawStream.prototype).to.be.an('object');
				expect(ConsoleFormattedRawStream.prototype.constructor).to.be.a('function');
			});
			it('should create an instance', () => {
				const instance = new ConsoleFormattedRawStream();
				expect(instance).to.be.a(ConsoleFormattedRawStream);
			});
			it('should support write', () => {
				const instance = new ConsoleFormattedRawStream();
				const consoleSpy = {
					debug: sinon.spy(),
					info: sinon.spy(),
					warn: sinon.spy(),
					error: sinon.spy()
				};
				instance._console = consoleSpy;
				let call = 0;
				instance.write({ call: call++, msg: 'Ping', level: WARN });
				expect(consoleSpy.warn.callCount).to.be(1);
				expect(consoleSpy.warn.args[0]).to.eql([ '%s %o', 'Ping', { call: 0 } ]);
				expect(consoleSpy.error.callCount).to.be(0);
				instance.write({ call: call++, level: FATAL });
				expect(consoleSpy.warn.callCount).to.be(1);
				expect(consoleSpy.error.callCount).to.be(1);
				expect(consoleSpy.error.args[0]).to.eql([ '%s %o', '', { call: 1 } ]);
				instance.write({ call: call++, level: ERROR });
				expect(consoleSpy.warn.callCount).to.be(1);
				expect(consoleSpy.warn.args.length).to.be(1);
				expect(consoleSpy.error.callCount).to.be(2);
				expect(consoleSpy.error.args[1]).to.eql([ '%s %o', '', { call: 2 } ]);
				expect(consoleSpy.error.args.length).to.be(2);
			});
		});
	});
});
