import { useMemo } from 'react';

const useDataDict = <T extends { id: number }>(data: T[] | undefined) => {
  return useMemo(() => {
    return (data || []).reduce<Record<string, T>>(
      (previousValue, currentValue) => {
        previousValue[currentValue.id] = currentValue;
        return previousValue;
      },
      {},
    );
  }, [data]);
};

export default useDataDict;
