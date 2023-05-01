import { createRef, RefObject, useCallback, useRef } from 'react';

function useDynamicRefs<T>() {
  const mapRef = useRef(new Map<string, RefObject<T>>());
  const getRef = useCallback((key: string): RefObject<T> | undefined => {
    return mapRef.current.get(key);
  }, []);
  const setRef = useCallback(
    (key: string): RefObject<T> => {
      let ref = getRef(key);
      if (!ref) {
        ref = createRef<T>();
        mapRef.current.set(key, ref);
      }
      return ref;
    },
    [getRef],
  );

  return { getRef, setRef };
}

export default useDynamicRefs;
