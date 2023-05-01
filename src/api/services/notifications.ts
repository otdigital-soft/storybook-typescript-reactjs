import { TenantsService } from 'api/schema';

export default {
  notifications: async (tenantId: number, page: number, pageSize: number) => {
    const response = await TenantsService.tenantsNotificationsList(
      tenantId,
      page,
      pageSize,
    );
    return response.data;
  },

  readNotifications: async (tenantId: number) => {
    const response = await TenantsService.tenantsNotificationsReadCreate(
      tenantId,
    );
    return response.data;
  },

  readNotification: async (tenantId: number, notificationId: number) => {
    const response = await TenantsService.tenantsNotificationsReadCreate2(
      notificationId,
      tenantId,
    );
    return response.data;
  },

  unreadNotifications: async (tenantId: number) => {
    const response = await TenantsService.tenantsNotificationsUnreadRetrieve(
      tenantId,
    );
    return response.data;
  },
};
