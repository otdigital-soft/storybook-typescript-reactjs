import useDeleteCustomWell from 'hooks/useDeleteCustomWell';
import { CustomWellDetails } from 'api/schema';
import { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import useInvalidateProjectWells from 'hooks/useInvalidateProjectWells';

const useDeleteWell = (
  well: CustomWellDetails | undefined,
  projectId: number,
) => {
  const navigate = useNavigate();
  const invalidateProjectWells = useInvalidateProjectWells(projectId);
  const onSuccess = useCallback(async () => {
    navigate(generatePath(routes.project, { projectId: String(projectId) }));
    await invalidateProjectWells();
  }, [invalidateProjectWells, navigate, projectId]);

  return useDeleteCustomWell({
    wellId: well?.id,
    wellName: well?.name,
    onSuccess,
  });
};

export default useDeleteWell;
