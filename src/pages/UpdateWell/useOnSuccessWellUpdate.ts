import { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import useInvalidateWells from 'hooks/useInvalidateWells';

const useOnSuccessWellUpdate = (wellId: number) => {
  const navigate = useNavigate();
  const invalidateWells = useInvalidateWells();

  const onSave = useCallback(async () => {
    await invalidateWells();
  }, [invalidateWells]);

  const onUpdate = useCallback(async () => {
    navigate(generatePath(routes.well, { wellId: String(wellId) }));
    await invalidateWells();
  }, [invalidateWells, navigate, wellId]);

  return {
    onSave,
    onUpdate,
  };
};

export default useOnSuccessWellUpdate;
