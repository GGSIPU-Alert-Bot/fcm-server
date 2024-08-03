-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "fcmToken" TEXT NOT NULL,
    "notificationPreference" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);
