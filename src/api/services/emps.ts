import { TenantsService } from 'api/schema';

export default {
  empConceptElements: async (tenantId: number) => {
    const { data } = await TenantsService.tenantsEmpsList(tenantId);
    return data;
  },
};
