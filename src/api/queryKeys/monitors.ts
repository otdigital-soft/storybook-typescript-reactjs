import { Ordering } from 'utils/ordering';
import { MonitorElementType } from 'api/services/monitors';

export default {
  monitors: ({
    pageSize,
    ordering,
    page,
    tenantId,
  }: {
    tenantId: number;
    page?: number;
    pageSize?: number;
    ordering?: Ordering;
  }) => {
    return [`/tenants/${tenantId}/monitors/`, page, pageSize, ordering];
  },

  monitor: (tenantId: number, monitorId: number) => {
    return [`/tenants/${tenantId}/monitors/${monitorId}/`];
  },

  monitorElements: (
    tenantId: number,
    monitorId: number,
    elementId: number,
    type: MonitorElementType,
  ) => {
    return [
      `/tenants/${tenantId}/monitors/${monitorId}/elements/${elementId}/`,
      type,
    ];
  },
};
