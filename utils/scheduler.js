const
  cron = require('cron').CronJob,
  Job = require('../routes/jobCollection');

exports.newJob((id, currPrice, query) => {
  new CronJob(
    '* * */12 * * *', 
    Job.Checar_Precio(id, currPrice, query), 
    null, true, 'America/Los_Angeles');
});