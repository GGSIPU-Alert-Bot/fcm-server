import { Request, Response } from 'express';;
import * as deviceService from '../services/deviceService';
import { sendFCMNotification } from '../services/fcmService';
import { Update } from '../models/Update';

let pendingUpdates: Update[] = [];

export const receiveUpdate = (req: Request, res: Response) => {
  try {
    const update = req.body as Update;
    
    if (!isValidUpdate(update)) {
      return res.status(400).json({ error: 'Invalid update data' });
    }
    
    if (update.isPriority) {
      processPriorityUpdate(update);
    } else {
      pendingUpdates.push(update);
    }
    
    res.status(200).json({ message: 'Update received' });
  } catch (error) {
    console.error('Error receiving update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const isValidUpdate = (update: any): update is Update => {
  return typeof update.id === 'string' &&
         typeof update.message === 'string' &&
         typeof update.timestamp === 'number' &&
         typeof update.isPriority === 'boolean';
};

const processPriorityUpdate = async (update: Update) => {
  try {
    const devices = await deviceService.getAllDevicesWithPreference('high_priority');
    const sendPromises = devices.map(device => 
      sendFCMNotification(
        device.fcmToken,
        'Priority Update',
        update.message,
        { updateId: update.id, timestamp: update.timestamp.toString() }
      )
    );
    await Promise.all(sendPromises);
  } catch (error) {
    console.error('Error processing priority update:', error);
  }
};

export const processPendingUpdates = async () => {
  if (pendingUpdates.length === 0) return;

  const updates = pendingUpdates.splice(0, pendingUpdates.length);
  const latestTimestamp = Math.max(...updates.map(u => u.timestamp));

  const groupedUpdates = updates.reduce<Record<string, Update[]>>((acc, update) => {
    (acc[update.id] = acc[update.id] || []).push(update);
    return acc;
  }, {});

  const summary = Object.entries(groupedUpdates)
    .map(([id, updates]) => `${updates.length} update(s) for ${id}`)
    .join(', ');

  try {
    const allNotificationDevices = await deviceService.getAllDevicesWithPreference('all');

    const sendPromises = allNotificationDevices.map(device => 
      sendFCMNotification(
        device.fcmToken,
        'New Updates Available',
        `You have ${updates.length} new updates: ${summary}`,
        { updateTimestamp: latestTimestamp.toString() }
      ).catch(error => {
        console.error(`Failed to send bundled updates to device ${device.id}:`, error);
      })
    );

    await Promise.all(sendPromises);
  } catch (error) {
    console.error('Error processing pending updates:', error);
  }
};