// standalone.js
// utility script to allow forerunner to run in a standalone mode
// standalone is useful for one off jobs or testing worker scripts
var forerunner = require('forerunner').forerunner;
var cluster = require('cluster');
var _ = require('underscore');
var fs = require('fs');

function standalone(script, input, output, numThreads, callback) {
  // start with basic options
  forerunner.start();

  // get the store object so that we can write out results
  var store = forerunner.getStore();

  var inputJobs;

  try {
    inputJobs = require(input);
  } catch(err) {
    return callback(err);
  }

  // setup the worker
  cluster.setupMaster({
    exec: script
  });

  for (var i = 0; i < numThreads; i++) {
    cluster.fork();
  }

  var jobsInFlight = [];
  var jobTypes = [];


  // assign all the jobs
  _.each(inputJobs, function(job) {
    jobTypes.push(job.type);
    forerunner.assignJob(job.type, job.data, function(err, id) {
      if (err) {
        console.error(err);
      } else {
        jobsInFlight.push(id);
      }
    });
  });

  var allTypes = _.uniq(jobTypes);

  var jobEndFn = function(jobId) {
    var index = jobsInFlight.indexOf(jobId);
    if (index === -1) {
      console.error('Unknown jobid came back. what?!');
    } else {
      jobsInFlight.splice(index, 1);
    }
    if (jobsInFlight.length === 0) {
      // all jobs are done, write out the results
      var results = store.getJobs();
      fs.writeFileSync(output, JSON.stringify(results, null, 2), 'utf-8');
      return callback();
    }
  };

  forerunner.onComplete(allTypes, jobEndFn);
  forerunner.onFailed(allTypes, jobEndFn);
}
module.exports = standalone;
