import express from 'express';
import { receiveUpdate } from '../controllers/updateController';

const router = express.Router();

router.post('/receive', receiveUpdate);

export default router;