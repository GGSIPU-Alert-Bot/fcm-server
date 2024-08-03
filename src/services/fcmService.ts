import admin from '../config/firebase';

export async function sendFCMNotification(token: string, title: string, body: string, data?: any) {
  const message = {
    notification: { title, body },
    data: data,
    token: token
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}