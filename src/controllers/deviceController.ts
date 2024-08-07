import { Request, Response } from 'express'
import * as deviceService from '../services/deviceService'

export const setNotificationPreference = async (req: Request, res: Response) => {
  const { deviceId } = req.params
  const { preference } = req.body

  if (preference !== 'all' && preference !== 'high_priority') {
    return res.status(400).json({ error: 'Invalid preference' })
  }

  try {
    const updatedDevice = await deviceService.updateDevicePreferences(deviceId, preference)
    res.json({ message: 'Preferences updated successfully', device: updatedDevice })
  } catch (error) {
    console.error('Error updating device preferences:', error)
    res.status(500).json({ error: 'Failed to update preferences' })
  }
}

export const setFCMToken = async (req: Request, res: Response) => {
  const { deviceId } = req.params
  const { fcmToken } = req.body

  try {
    const updatedDevice = await deviceService.updateDeviceFCMToken(deviceId, fcmToken)
    res.json({ message: 'FCM token updated successfully', device: updatedDevice })
  } catch (error) {
    console.error('Error updating FCM token:', error)
    res.status(500).json({ error: 'Failed to update FCM token' })
  }
}

export async function setCollegePreference(req: Request, res: Response) {
  const { deviceId } = req.params;
  const { college } = req.body;

  try {
    await deviceService.updateCollegePreference(deviceId, college);
    res.json({ message: 'College preference updated successfully' });
  } catch (error) {
    console.error('Error updating college preference:', error);
    res.status(500).json({ error: 'Failed to update college preference' });
  }
}