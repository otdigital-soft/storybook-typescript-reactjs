import { PoliciesService } from 'api/schema';

export default {
  policyLatest: async () => {
    const response = await PoliciesService.policiesLatestRetrieve();
    return response.data;
  },
};
