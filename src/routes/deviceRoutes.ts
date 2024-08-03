import express from 'express';
import { setNotificationPreference, setFCMToken } from '../controllers/deviceController';

const router = express.Router();

router.put('/:deviceId/preferences', setNotificationPreference);
router.put('/:deviceId/fcm-token', setFCMToken);

export default router;