import { useCallback, useMemo, useState } from 'react';

export enum TagFilter {
  latest = 'latest',
  completed = 'completed',
  draft = 'draft',
}

export const useTagsFilter = () => {
  const [activeTag, setActiveTag] = useState<TagFilter | undefined>();
  const changeTag = useCallback((value: TagFilter) => {
    setActiveTag((oldActiveTag) =>
      oldActiveTag === value ? undefined : value,
    );
  }, []);

  const queryFilters: Record<'draft' | 'latest', boolean | undefined> =
    useMemo(() => {
      if (activeTag === TagFilter.draft) {
        return {
          draft: true,
          latest: undefined,
        };
      } else if (activeTag === TagFilter.completed) {
        return {
          draft: false,
          latest: undefined,
        };
      } else if (activeTag === TagFilter.latest) {
        return {
          draft: false,
          latest: true,
        };
      }
      return {
        draft: undefined,
        latest: undefined,
      };
    }, [activeTag]);

  return {
    queryFilters,
    activeTag,
    changeTag,
  };
};
