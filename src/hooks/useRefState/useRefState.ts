import { useEffect, useRef } from 'react';

function useRefState<T>(state: T) {
  const stateRef = useRef<T>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);
  return stateRef;
}

export default useRefState;
