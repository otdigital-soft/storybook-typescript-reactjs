import { useQueryClient } from 'react-query';
import { useCallback } from 'react';

const useListCache = <T extends { id: number }>(cacheKey: string[]) => {
  const queryClient = useQueryClient();

  const addToCache = useCallback(
    (
      addedElement: T,
      options:
        | {
            compareFn?: (a: T, b: T) => number;
          }
        | undefined = {},
    ) => {
      const oldElements = queryClient.getQueryData<T[]>(cacheKey);
      const newData = oldElements
        ? [...oldElements, addedElement]
        : [addedElement];
      if (options.compareFn) {
        newData.sort(options.compareFn);
      }
      return queryClient.setQueryData<T[]>(cacheKey, newData);
    },
    [queryClient, cacheKey],
  );

  const updateCache = useCallback(
    (updatedElement: T) => {
      const oldElements = queryClient.getQueryData<T[]>(cacheKey);
      return queryClient.setQueryData<T[]>(
        cacheKey,
        oldElements
          ? oldElements.map((oldElement) =>
              oldElement.id === updatedElement.id ? updatedElement : oldElement,
            )
          : [updatedElement],
      );
    },
    [queryClient, cacheKey],
  );

  const removeFromCache = useCallback(
    (removedElement: T) => {
      const oldElements = queryClient.getQueryData<T[]>(cacheKey);
      return queryClient.setQueryData<T[]>(
        cacheKey,
        oldElements
          ? oldElements.filter((element) => element.id !== removedElement.id)
          : [],
      );
    },
    [queryClient, cacheKey],
  );

  return {
    addToCache,
    updateCache,
    removeFromCache,
  };
};

export default useListCache;
