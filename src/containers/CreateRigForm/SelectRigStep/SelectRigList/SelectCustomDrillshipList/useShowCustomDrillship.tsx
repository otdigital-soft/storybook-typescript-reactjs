import { useState } from 'react';
import useCustomDrillship from 'hooks/useCustomDrillship';

const useShowCustomDrillship = () => {
  const [customDrillshipId, setCustomDrillshipId] = useState<number>();
  const query = useCustomDrillship(customDrillshipId);

  return {
    ...query,
    customDrillshipId,
    setCustomDrillshipId,
  };
};

export default useShowCustomDrillship;
