// example worker script.
var worker = require('forerunner').worker;
var ping = require('forerunner').builtin.tasks.ping;

worker.registerJobHandler('ping', ping);

// start the worker
var forerunnerLocation = 'http://localhost:2718';
worker.start(forerunnerLocation);
