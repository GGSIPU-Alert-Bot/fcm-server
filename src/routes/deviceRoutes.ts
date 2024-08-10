import express from 'express';
import { setNotificationPreference, setFCMToken, setCollegePreference } from '../controllers/deviceController';

const router = express.Router();

router.put('/:deviceId/preferences', setNotificationPreference);
router.put('/:deviceId/fcm-token', setFCMToken);
router.put('/:deviceId/college-preference', setCollegePreference);

export default router;
