export interface Device {
    id: string;
    fcmToken: string;
    notificationPreference: 'all' | 'high_priority';
  }