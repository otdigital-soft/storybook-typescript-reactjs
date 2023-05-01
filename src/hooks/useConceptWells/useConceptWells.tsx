import { useQuery } from 'react-query';
import wellsServices from 'api/services/wells';
import wellsQueryKeys from 'api/queryKeys/wells';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import { useState } from 'react';

const useConceptWells = ({
  initialPage,
  pageSize,
}: {
  initialPage?: number;
  pageSize?: number;
}) => {
  const { tenantId } = useTenant();
  const [page, setPage] = useState(initialPage || 1);
  const query = useQuery(
    tenantId ? wellsQueryKeys.conceptWells({ tenantId, page, pageSize }) : [],
    tenantId
      ? () => wellsServices.conceptWells({ tenantId, page, pageSize })
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

export default useConceptWells;
