import { useState } from 'react';
import useCustomSemiRig from 'hooks/useCustomSemiRig';

const useShowCustomSemiRig = () => {
  const [customSemiRigId, setCustomSemiRigId] = useState<number>();
  const query = useCustomSemiRig(customSemiRigId);

  return {
    ...query,
    customSemiRigId,
    setCustomSemiRigId,
  };
};

export default useShowCustomSemiRig;
