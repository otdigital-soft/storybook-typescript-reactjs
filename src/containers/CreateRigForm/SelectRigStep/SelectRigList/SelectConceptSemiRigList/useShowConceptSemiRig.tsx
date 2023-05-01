import { useQuery } from 'react-query';
import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import { useState } from 'react';

const useShowConceptSemiRig = () => {
  const { tenantId } = useTenant();
  const [conceptSemiRigId, setConceptSemiRigId] = useState<number>();

  const enabled = !!(tenantId && conceptSemiRigId);

  const query = useQuery(
    enabled ? rigsQueryKeys.conceptSemi(tenantId, conceptSemiRigId) : [],
    enabled ? () => rigsServices.conceptSemi(tenantId, conceptSemiRigId) : noop,
    {
      enabled,
    },
  );

  return {
    ...query,
    conceptSemiRigId,
    setConceptSemiRigId,
  };
};

export default useShowConceptSemiRig;
