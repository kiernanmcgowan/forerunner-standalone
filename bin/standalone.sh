#!/usr/bin/env node
var program = require('commander');
var pck = require('../package.json');
var path = require('path');
var standalone = require('../lib/standalone.js');

program
  .version(pck.version)
  .option('-i, --input <file>', 'Input jobs (json format)')
  .option('-w, --worker <file>', 'Worker script')
  .option('-o, --output <file>', 'Output json', 'standalone.json')
  .option('-p, --port <port>', 'Port number for forerunner mananger', 2718)
  .option('-n, --numThreads <numThreads>', 'Number of worker threads', 1)
  .parse(process.argv);

if (!program.input) {
  console.error('Must specify input job file');
  process.exit(1);
}

if (!program.worker) {
  console.error('Must specify worker script');
  process.exit(1);
}

program.numThreads = parseInt(program.numThreads, 10);

if (program.numThreads < 1 || typeof program.numThreads !== 'number' || isNaN(program.numThreads)) {
  console.error('Number of threads in incorrect ಠ_ಠ. %s', program.numThreads);
  process.exit(1);
}

var input = path.resolve(process.cwd(), program.input);
var output = path.resolve(process.cwd(), program.output);
var worker = path.resolve(process.cwd(), program.worker);
var options = {
  port: parseInt(program.port),
}

console.log('Forerunner - standalone: running %s on %s thread(s)', program.worker, program.numThreads);
// kick off the scripts
standalone(worker, input, output, program.numThreads, options, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
