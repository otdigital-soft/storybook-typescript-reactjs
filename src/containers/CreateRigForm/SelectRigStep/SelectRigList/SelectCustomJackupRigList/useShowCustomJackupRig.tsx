import { useState } from 'react';
import useCustomJackupRig from 'hooks/useCustomJackupRig';

const useShowCustomJackupRig = () => {
  const [customJackupRigId, setCustomJackupRigId] = useState<number>();
  const query = useCustomJackupRig(customJackupRigId);

  return {
    ...query,
    customJackupRigId,
    setCustomJackupRigId,
  };
};

export default useShowCustomJackupRig;
