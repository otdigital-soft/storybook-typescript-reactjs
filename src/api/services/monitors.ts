import { Ordering } from 'utils/ordering';
import { TenantsService } from 'api/schema';

export enum MonitorElementType {
  Daily = 'DAILY',
  Cumulative = 'CUMULATIVE',
}

export default {
  monitors: async ({
    page,
    pageSize,
    ordering,
    tenantId,
  }: {
    tenantId: number;
    page?: number;
    pageSize?: number;
    ordering?: Ordering;
  }) => {
    const response = await TenantsService.tenantsMonitorsList(
      tenantId,
      ordering,
      page,
      pageSize,
    );
    return response.data;
  },

  monitor: async (tenantId: number, monitorId: number) => {
    const response = await TenantsService.tenantsMonitorsRetrieve(
      monitorId,
      tenantId,
    );
    return response.data;
  },

  monitorElements: async (
    tenantId: number,
    monitorId: number,
    elementId: number,
    type: MonitorElementType,
  ) => {
    const response = await TenantsService.tenantsMonitorsElementsList(
      elementId,
      monitorId,
      tenantId,
      type,
    );
    return response.data;
  },
};
