import useDeleteCustomWell from 'hooks/useDeleteCustomWell';
import { CustomWellDetails } from 'api/schema';
import { useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { PrepareTab } from 'pages/Prepare/Prepare';
import useInvalidateWells from 'hooks/useInvalidateWells';

const useDeleteWell = (well: CustomWellDetails | undefined) => {
  const navigate = useNavigate();
  const invalidateWells = useInvalidateWells();
  const onSuccess = useCallback(async () => {
    navigate(generatePath(routes.prepareTab, { tabId: PrepareTab.Wells }));
    await invalidateWells();
  }, [invalidateWells, navigate]);

  return useDeleteCustomWell({
    wellId: well?.id,
    wellName: well?.name,
    onSuccess,
  });
};

export default useDeleteWell;
