import { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import useInvalidateProjectWells from 'hooks/useInvalidateProjectWells';

const useOnSuccessWellUpdate = (projectId: number) => {
  const navigate = useNavigate();
  const invalidateProjectWells = useInvalidateProjectWells(projectId);

  const onUpdate = useCallback(async () => {
    navigate(generatePath(routes.project, { projectId: String(projectId) }));
    await invalidateProjectWells();
  }, [invalidateProjectWells, navigate, projectId]);

  const onSave = useCallback(async () => {
    await invalidateProjectWells();
  }, [invalidateProjectWells]);

  return {
    onUpdate,
    onSave,
  };
};

export default useOnSuccessWellUpdate;
