import { CronJob } from 'cron';
import { processPendingUpdates } from '../controllers/updateController';

export const startCronJobs = () => {
  new CronJob('0 * * * *', processPendingUpdates, null, true);
};
