import useTenant from 'hooks/useTenant';
import supportQueryKeys from 'api/queryKeys/support';
import supportServices from 'api/services/support';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

const useFaq = () => {
  const { tenantId } = useTenant();
  return useQuery(
    tenantId ? supportQueryKeys.faq(tenantId) : [],
    tenantId ? () => supportServices.faq(tenantId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useFaq;
