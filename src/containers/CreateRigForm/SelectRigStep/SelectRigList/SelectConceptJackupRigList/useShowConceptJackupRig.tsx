import { useQuery } from 'react-query';
import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import { useState } from 'react';

const useShowConceptJackupRig = () => {
  const { tenantId } = useTenant();
  const [conceptJackupRigId, setConceptJackupRigId] = useState<number>();

  const enabled = !!(tenantId && conceptJackupRigId);

  const query = useQuery(
    enabled ? rigsQueryKeys.conceptJackup(tenantId, conceptJackupRigId) : [],
    enabled
      ? () => rigsServices.conceptJackup(tenantId, conceptJackupRigId)
      : noop,
    {
      enabled,
    },
  );

  return {
    ...query,
    conceptJackupRigId,
    setConceptJackupRigId,
  };
};

export default useShowConceptJackupRig;
