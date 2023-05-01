import { useState } from 'react';
import useConceptWell from 'hooks/useConceptWell';

const useShowConceptWell = () => {
  const [conceptWellId, setConceptWellId] = useState<number>();
  const query = useConceptWell(conceptWellId);

  return {
    ...query,
    conceptWellId,
    setConceptWellId,
  };
};

export default useShowConceptWell;
