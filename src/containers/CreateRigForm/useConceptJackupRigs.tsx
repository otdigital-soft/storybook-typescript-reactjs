import { useState } from 'react';
import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';

import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

const useConceptJackupRigs = ({ pageSize }: { pageSize: number }) => {
  const { tenantId } = useTenant();
  const [page, setPage] = useState(1);

  const query = useQuery(
    tenantId ? rigsQueryKeys.conceptJackups(tenantId, page, pageSize) : [],
    tenantId
      ? () => rigsServices.conceptJackups(tenantId, page, pageSize)
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

export default useConceptJackupRigs;
