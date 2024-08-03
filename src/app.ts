import express from 'express';
import deviceRoutes from './routes/deviceRoutes';
import updateRoutes from './routes/updateRoutes';
import { startCronJobs } from './utils/cronJobs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/devices', deviceRoutes);
app.use('/api/updates', updateRoutes);

startCronJobs();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});