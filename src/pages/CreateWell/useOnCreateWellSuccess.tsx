import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateUpdateWellPath } from 'routes/utils';
import { CustomWellDetails } from 'api/schema';
import useInvalidateWells from 'hooks/useInvalidateWells';

const useOnCreateWellSuccess = () => {
  const navigate = useNavigate();
  const invalidateWells = useInvalidateWells();
  return useCallback(
    async (data: CustomWellDetails) => {
      navigate(generateUpdateWellPath(data.id));
      await invalidateWells();
    },
    [invalidateWells, navigate],
  );
};

export default useOnCreateWellSuccess;
