import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateUpdateWellPath } from 'routes/utils';
import { CustomWellDetails } from 'api/schema';
import useInvalidateProjectWells from 'hooks/useInvalidateProjectWells';

const useOnCreateWellSuccess = (projectId: number) => {
  const navigate = useNavigate();
  const invalidateProjectWells = useInvalidateProjectWells(projectId);
  return useCallback(
    async (data: CustomWellDetails) => {
      navigate(generateUpdateWellPath(data.id, projectId));
      await invalidateProjectWells();
    },
    [invalidateProjectWells, navigate, projectId],
  );
};

export default useOnCreateWellSuccess;
