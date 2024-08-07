import prisma from './prisma'

export const getDeviceById = async (id: string) => {
  return prisma.device.findUnique({
    where: { id },
  })
}

export const updateDevicePreferences = async (id: string, preference: 'all' | 'high_priority') => {
  return prisma.device.upsert({
    where: { id },
    update: { notificationPreference: preference },
    create: { id, fcmToken: '', notificationPreference: preference },
  })
}

export const updateDeviceFCMToken = async (id: string, fcmToken: string) => {
  return prisma.device.upsert({
    where: { id },
    update: { fcmToken },
    create: { id, fcmToken, notificationPreference: 'high_priority' },
  })
}

export const getAllDevicesWithPreference = async (preference: 'all' | 'high_priority') => {
  return prisma.device.findMany({
    where: { notificationPreference: preference },
  })
}

export async function updateCollegePreference(deviceId: string, college: string): Promise<void> {
  await prisma.device.update({
    where: { id: deviceId },
    data: { collegePreference: college },
  });
}
