import { TenantsService } from 'api/schema';

export default {
  faq: async (tenantId: number) => {
    const { data } = await TenantsService.tenantsSupportFaqList(tenantId);
    return data;
  },
};
