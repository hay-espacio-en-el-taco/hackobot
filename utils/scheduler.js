const
  cron = require('cron').CronJob,
  Job = require('../routes/jobCollection');

exports.newJob=(id, currPrice, query) => {
  new cron(
    '* * */12 * * *', 
    Job.Checar_Precio(id, currPrice, query), 
    null, true, 'America/Los_Angeles');
};

