export default {
  allNotifications: (tenantId: number) => {
    return [`/tenants/${tenantId}/notifications/`];
  },
  notifications: (tenantId: number, page: number, pageSize: number) => {
    return [`/tenants/${tenantId}/notifications/`, page, pageSize];
  },
  unreadNotifications: (tenantId: number) => {
    return [`/tenants/${tenantId}/notifications/`, 'unread'];
  },
};
