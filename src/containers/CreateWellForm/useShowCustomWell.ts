import { useState } from 'react';
import useCustomWell from 'hooks/useCustomWell';

const useShowCustomWell = () => {
  const [customWellId, setCustomWellId] = useState<number>();
  const query = useCustomWell(customWellId);

  return {
    ...query,
    customWellId,
    setCustomWellId,
  };
};

export default useShowCustomWell;
