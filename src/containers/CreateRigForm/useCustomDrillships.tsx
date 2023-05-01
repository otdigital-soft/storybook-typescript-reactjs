import { useState } from 'react';
import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';

import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

const useCustomDrillships = ({ pageSize }: { pageSize: number }) => {
  const { tenantId } = useTenant();
  const [page, setPage] = useState(1);

  const query = useQuery(
    tenantId ? rigsQueryKeys.customDrillships(tenantId, page, pageSize) : [],
    tenantId
      ? () => rigsServices.customDrillships(tenantId, page, pageSize, false)
      : noop,
    {
      enabled: !!tenantId,
    },
  );

  return {
    ...query,
    page,
    setPage,
  };
};

export default useCustomDrillships;
