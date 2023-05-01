import { useQuery } from 'react-query';
import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import { useState } from 'react';

const useShowConceptDrillship = () => {
  const { tenantId } = useTenant();
  const [conceptDrillshipId, setConceptDrillshipId] = useState<number>();

  const enabled = !!(tenantId && conceptDrillshipId);

  const query = useQuery(
    enabled ? rigsQueryKeys.conceptDrillship(tenantId, conceptDrillshipId) : [],
    enabled
      ? () => rigsServices.conceptDrillship(tenantId, conceptDrillshipId)
      : noop,
    {
      enabled,
    },
  );

  return {
    ...query,
    conceptDrillshipId,
    setConceptDrillshipId,
  };
};

export default useShowConceptDrillship;
