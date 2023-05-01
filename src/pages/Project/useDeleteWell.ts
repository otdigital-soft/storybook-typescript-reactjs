import useDeleteCustomWell from 'hooks/useDeleteCustomWell';
import { CustomWellList } from 'api/schema';
import { useCallback } from 'react';
import useInvalidateProjectWells from 'hooks/useInvalidateProjectWells';

const useDeleteWell = (well: CustomWellList, projectId: number) => {
  const invalidateProjectWells = useInvalidateProjectWells(projectId);
  const onSuccess = useCallback(async () => {
    await invalidateProjectWells();
  }, [invalidateProjectWells]);

  return useDeleteCustomWell({
    wellId: well.id,
    wellName: well.name,
    onSuccess,
  });
};

export default useDeleteWell;
