import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import empsQueryKeys from 'api/queryKeys/emps';
import empsServices from 'api/services/emps';
import { noop } from 'utils/api';

const useEMPConceptElements = () => {
  const { tenantId } = useTenant();
  return useQuery(
    tenantId ? empsQueryKeys.empConceptElements(tenantId) : [],
    tenantId ? () => empsServices.empConceptElements(tenantId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useEMPConceptElements;
