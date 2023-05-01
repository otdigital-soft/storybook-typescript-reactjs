import { useMemo } from 'react';
import wellsQueryKeys from 'api/queryKeys/wells';
import useListCache from 'hooks/useListCache';
import { WellNameList } from 'api/schema';
import useTenant from 'hooks/useTenant';

const useWellNamesCache = () => {
  const { tenantId } = useTenant();
  const cacheKey = useMemo(
    () => wellsQueryKeys.wellNames(Number(tenantId)),
    [tenantId],
  );

  return useListCache<WellNameList>(cacheKey);
};

export default useWellNamesCache;
