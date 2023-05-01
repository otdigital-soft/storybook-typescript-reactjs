import privacyQueryKeys from 'api/queryKeys/privacy';
import privacyServices from 'api/services/policies';

import { useQuery } from 'react-query';

const usePrivacyPolicyLatest = () => {
  return useQuery(
    privacyQueryKeys.privacyPolicyLatest(),
    privacyServices.policyLatest,
  );
};

export default usePrivacyPolicyLatest;
